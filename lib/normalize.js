require('../polyfills/object-assign')
require('../polyfills/string-includes')
require('../polyfills/map')
require('../polyfills/set')

if (typeof Promise === 'undefined') {
  require('../polyfills/promise')
}
