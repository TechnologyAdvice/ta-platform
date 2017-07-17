var Base64 = require('Base64')

;(function (self) {  
  self.atob = self.atob || Base64.atob
  self.btoa = self.btoa || Base64.btoa
})(window)
