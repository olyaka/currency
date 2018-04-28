'use strict';

var onError = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff6d51;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.top = document.documentElement.clientHeight / 2 + window.pageYOffset + 'px';
  node.style.fontSize = '30px';

  node.classList.add('error');

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
  document.addEventListener('click', function () {
    node.remove();
  });
};

var onLoad = function (serverData) {
  var label = document.querySelector('.output');
  if (serverData.status === '200') {
    var propertyNames = Object.keys(serverData.data);
    label.innerHTML = serverData.data[propertyNames[0]];
  } else {
    label.innerHTML = 'Пара не найдена';
  }
};

var onListLoad = function (serverData) {
  var selectFirst = document.querySelector('select.first');
  var selectSecond = document.querySelector('select.second');

  var pairs = window.util.createCurrencyLists(serverData.data);

  for (var i = 0; i < pairs.first.length; i++) {
    window.util.addOption(selectFirst, pairs.first[i]);
  }

  for (i = 0; i < pairs.second.length; i++) {
    window.util.addOption(selectSecond, pairs.second[i]);
  }

  selectFirst.addEventListener('change', function () {
    if (selectFirst.options[selectFirst.selectedIndex].innerHTML === 'не выбрано') {
      window.util.clearSelect(selectSecond);

      for (i = 0; i < pairs.second.length; i++) {
        window.util.addOption(selectSecond, pairs.second[i]);
      }
    } else {
      window.util.setList(selectFirst, selectSecond, serverData, pairs);
    }
  });

  selectSecond.addEventListener('change', function () {
    if (selectSecond.options[selectSecond.selectedIndex].innerHTML === 'не выбрано') {
      window.util.clearSelect(selectFirst);

      for (i = 0; i < pairs.first.length; i++) {
        window.util.addOption(selectFirst, pairs.first[i]);
      }
    }
  });
};

window.backend.load('https://currate.ru/api/?get=currency_list&key=41c457c38223f68ed751b29e80ddcfc5', onListLoad, onError);

document.querySelector('button').addEventListener('click', function () {
  var selectFirst = document.querySelector('select.first');
  var selectSecond = document.querySelector('select.second');
  var pair = selectFirst.options[selectFirst.selectedIndex].value + selectSecond.options[selectSecond.selectedIndex].value;
  var url = 'https://currate.ru/api/?get=rates&pairs=' + pair + '&key=41c457c38223f68ed751b29e80ddcfc5';
  window.backend.load(url, onLoad, onError);
});
