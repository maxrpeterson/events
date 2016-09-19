var Events = (function() {
  var topics = {};
  return {
    on: function(topic, cb) {
      if (typeof cb !== 'function') {
        throw new TypeError('callback is not a function');
      }
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }
      if (topics[topic].indexOf(cb) > -1) {
        return;
      }
      var i = topics[topic].push(cb) - 1;
      return {
        off: function() {
          delete topics[topic][i];
        }
      };
    },
    once: function(topic, cb) {
      var subscription = this.on(topic, function() {
        cb.apply(null, arguments);
        subscription.off();
      });
      return subscription;
    },
    off: function(topic, cb) {
      if (!topics[topic]) return;
      topics[topic] = topics[topic].filter(function(subFn) {
        return subFn !== cb;
      });
    },
    emit: function(topic, data) {
      if (!topics.hasOwnProperty(topic)) return;
      topics[topic].forEach(function(cb) {
        setTimeout(function() {
          cb(data);
        }, 0);
      });
    }
  };
})();
