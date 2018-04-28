'use strict';

window.util = (function () {
  return {
    addOption: function (select, value) {
      var option = document.createElement('option');
      option.value = value;
      option.innerHTML = window.currency.names[value];
      select.appendChild(option);
    },

    clearSelect: function (select) {
      for (var i = select.options.length - 1; i > 0; i--) {
        if (select.options[i].innerHTML !== 'не выбрано') {
          select.options[i] = null;
        }
      }
    },

    setList: function (selectFirst, selectSecond, serverData, pairs) {
      window.util.clearSelect(selectSecond);

      for (var i = 0; i < pairs.second.length; i++) {
        if (serverData.data.includes(selectFirst.options[selectFirst.selectedIndex].value + pairs.second[i])) {
          window.util.addOption(selectSecond, pairs.second[i]);
        }
      }
    },


    createCurrencyLists: function (currencyPairs) {
      var pairs = {
        first: [],
        second: []
      };

      for (var i = 0; i < currencyPairs.length; i++) {
        var firstInPair = currencyPairs[i].slice(0, 3);
        var secondInPair = currencyPairs[i].slice(3, 6);
        if (!pairs.first.includes(firstInPair)) {
          pairs.first.push(firstInPair);
        }
        if (!pairs.second.includes(secondInPair)) {
          pairs.second.push(secondInPair);
        }
      }

      return pairs;
    }
  };

})();
