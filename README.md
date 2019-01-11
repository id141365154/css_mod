# CSS_MOD

* Позволяет загружать css на страницу только для блоков которые присутствуют на странице.

* Реализовано кеширование css в localStorage.

* Отслеживание изменения содержимого css файлов - обновление кеша.



Библиоека состоит из двух частей
CSS_MOD.js - необходимо подключить на страницу любым способом. Рекомендуется через тег script для экономии числа запросов.
CSS_MOD.php - Необходимо разместить на сервере в дирректории вашего проекта.

## Пример использования

### Настройка серверной части

Заполните константы 
```php
DEFINE('HTML_BLOCKS_PREFIX','css_mod__');  // префикс в имени класса блока
DEFINE('BLOCKS_PATH','./css/blocks/');     // дирректория css блоков
DEFINE('COMMON_PATH','./css/common/');     // директория с общими стилями
DEFINE('COMMON_BUNDLE','common.css');      // имя файла с общими стилями для всех страниц
```

### Настройка клиентской части части
```javascript
var css = new CSS_MOD;
css.init({
	blockClassPrefix:"css_mod__",   // префикс в имени класса блока
	url: '/CSS_MOD.php'             // url до серверной части библиотеки
});
```


### Стркутура дирректорий css блоков

Каждый блок должен находиться в отдельной диррестории

В дирректории обязательно должен быть основной файл с именем == имени директории.