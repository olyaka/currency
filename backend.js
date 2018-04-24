'use strict';

window.backend = (function () {
    return {
      load: function (onLoad, onError) {
        var pair = document.querySelector('input').value.toUpperCase();

        var url = 'https://currate.ru/api/?get=rates&pairs=' + pair + '&key=41c457c38223f68ed751b29e80ddcfc5';

        var xhr = new XMLHttpRequest();
        
        xhr.responseType = 'json';
  
        xhr.addEventListener('load', function () {
          if (xhr.status === 200) {

            onLoad(xhr.response);
            
          } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
        });
  
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });

        xhr.open('GET', url);
        xhr.send();
      },
    };
  })();

