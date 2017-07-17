;(function (self) {
  if (typeof self.CustomEvent === 'function') return

  function CustomEvent (event, params) {
    var evt
    
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = self.Event.prototype
  self.CustomEvent = CustomEvent
})(window);
