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
  var select = document.querySelector('select');

  for (var i = 0; i < serverData.data.length; i++) {
    var option = document.createElement('option');
    option.innerHTML = serverData.data[i];
    select.appendChild(option);
  }
};

window.backend.load('https://currate.ru/api/?get=currency_list&key=41c457c38223f68ed751b29e80ddcfc5', onListLoad, onError);

document.querySelector('button').addEventListener('click', function () {
  var select = document.querySelector('select');
  var pair = select.options[select.selectedIndex].innerHTML;
  var url = 'https://currate.ru/api/?get=rates&pairs=' + pair + '&key=41c457c38223f68ed751b29e80ddcfc5';
  window.backend.load(url, onLoad, onError);
});
