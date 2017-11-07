export default function normalize () {
  require('./object-assign')
  require('./string-includes')
  require('./map')
  require('./set')

  if (typeof Promise === 'undefined') {
    require('./promise')
  }
}
