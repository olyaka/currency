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
  if(serverData.status === 200) {
    var propertyNames = Object.keys(serverData.data);
    label.innerHTML = serverData.data[propertyNames[0]];
  } else {
    label.innerHTML = 'Пара не найдена';
  }
};

document.querySelector('button').addEventListener('click', function (evt) {
  window.backend.load(onLoad, onError)
});
