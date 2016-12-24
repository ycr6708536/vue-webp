var canUseWebp = (function() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    return false;
  }
})();

module.exports = function(Vue) {
  var isVueNext = Vue.version.split('.')[0] === '2';

  function update(el, option) {
    var attr = option.arg || 'src';
    if (el.tagName.toLowerCase() === 'img' && option.value) {
      if (option.value.indexOf('data:image') < 0) {
        var tmp = option.value.substring(0, option.value.lastIndexOf('.')) + '.webp';
        el.setAttribute(attr, canUseWebp ? tmp : option.value);
      } else {
        el.setAttribute(attr, option.value);
      }

    }
  };

  if (isVueNext) {
    Vue.directive('webp', function(el, binding) {
      update(el, {
        arg: binding.arg,
        value: binding.value
      });
    })
  } else {
    Vue.directive('webp', {
      bind: function() {},
      update: function(val, old) {
        update(this.el, {
          arg: this.arg,
          value: val
        });
      },
      unbind: function() {}
    })
  }
};
