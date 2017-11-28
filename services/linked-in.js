const DEFAULT_USER_FIELDS = [
  'currentShare',
  'emailAddress',
  'firstName',
  'headline',
  'industry',
  'lastName',
  'location',
  'numConnections',
  'numConnectionsCapped',
  'pictureUrl',
  'publicProfileUrl',
  'specialties',
  'summary',
]

class LinkedInService {
  _sdk = null

  constructor (apiKey) {
    if (!apiKey) {
      throw new Error('Public LinkedIn API key is required.')
    }

    this._apiKey = apiKey
  }

  async init () {
    return new Promise((resolve, reject) => {
      if (this._sdk) return resolve(this._sdk)

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//platform.linkedin.com/in.js'
      script.innerHTML = `
          api_key: ${this._apiKey}
          authorize: true
          onLoad: __onLinkedInLoad__
      `
      script.onerror = (e) => {
        reject(e.message ? e : new Error('LinkedIn social login was blocked'))
      }
      window.__onLinkedInLoad__ = () => {
        this._sdk = window.IN
        if (!this._sdk) {
          reject(new Error('Failed to load LinkedIn SDK'))
          return
        }

        window.__onLinkedInLoad__ = null
        resolve(this._sdk)
      }
      document.body.appendChild(script)
    })
  }

  async logout () {
    this._sdk.User.logout()
  }

  async authorize ()  {
    await new Promise((resolve, reject) => {
      this._sdk.User.authorize(resolve)
    })
    return await this.getUser()
  }

  async getUser (fields = DEFAULT_USER_FIELDS) {
    // Clone fields because the LinkedIn SDK mutates the array. Shame.
    const requestedFields = [...fields]

    return new Promise((resolve, reject) => {
      this._sdk.API.Profile('me').fields(requestedFields)
        .result((res) => {
          resolve(res.values[0])
        })
        .error(reject)
    })
  }

  get isAuthenticated () {
    if (!this._sdk) return false
    return this._sdk.User.isAuthorized()
  }
}

export default LinkedInService
