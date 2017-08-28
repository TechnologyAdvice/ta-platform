const AWS = require('aws-sdk')
const path = require('path')
const cp = require('child_process')

function invalidateCloudfront (distributionId, config) {
  return new Promise((resolve, reject) => {
    const cloudfront = new AWS.CloudFront({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    })

    cloudfront.createInvalidation({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: '' + Date.now(),
        Paths: {
          Quantity: 2,
          Items: [
            '/',
            '/*',
          ],
        },
      },
    }, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

function syncDirectory (dir, bucket, config) {
  const run = (cmd) => cp.execSync([
    `AWS_ACCESS_KEY_ID=${config.accessKeyId}`,
    `AWS_SECRET_ACCESS_KEY=${config.secretAccessKey}`,
    cmd,
  ].join(' '), { stdio: 'inherit' })

  return new Promise((resolve, reject) => {
    run(`aws s3 sync ${dir} s3://${bucket}/ --delete --acl public-read --cache-control "max-age=604800"`)
    run([
      `aws s3 cp s3://${bucket} s3://${bucket} --exclude "*" --include "*.html"`,
      `--recursive --metadata-directive REPLACE --acl public-read --cache-control "max-age=0"`,
    ].join(' '))
    resolve()
  })
}

function validateS3Config (config) {
  if (!config.accessKeyId) {
    throw new Error(
      'An AWS_ACCESS_KEY_ID is required to deploy to S3. Either provide ' +
      '`config.accessKeyId` to the deploy script, or set the AWS_ACCESS_KEY_ID ' +
      'environment variable.'
    )
  }
  if (!config.secretAccessKey) {
    throw new Error(
      'An AWS_SECRET_ACCESS_KEY is required to deploy to S3. Either provide ' +
      '`config.secretAccessKey` to the deploy script, or set the AWS_SECRET_ACCESS_KEY ' +
      'environment variable.'
    )
  }
  if (!config.s3 || !config.s3.bucket) {
    throw new Error(
      'A bucket name is required to deploy to S3. Provide this via config.s3.bucket.'
    )
  }
}

module.exports = function deployS3 (dir, opts) {
  return Promise.resolve()
    .then(() => {
      const config = Object.assign({}, opts)
      config.accessKeyId = config.accessKeyId || process.env.AWS_ACCESS_KEY_ID
      config.secretAccessKey = config.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY
      validateS3Config(config)
      return config
    })
    .then((config) => {
      return syncDirectory(dir, config.s3.bucket, config)
        .then(() => {
          if (!config.cloudfront) return
          return invalidateCloudfront(config.cloudfront.distributionId, config)
        })
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
