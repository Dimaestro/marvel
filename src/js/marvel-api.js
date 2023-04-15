import axios from 'axios';
import md5 from 'md5';

export class MarvelApi {

 static PUBLIC_KEY = '362c5982a1bb7f937dd44f95ce965f3b';
 static PRIVATE_KEY = '6029b0905eedb0e67e35a1cbd973b27ffa2f6416';
 static URL_BASIS = 'https://gateway.marvel.com/v1/public';
 static TS = 1;
 static URL_CHARACTERS = '/characters';
 static URL_COMICS = '/comics';
 

  constructor() {
    this.limit = 16;
    this.name = null;
    this.hash = '';
  }

  getCharacters() {
    const options = {
      baseURL: MarvelApi.URL_BASIS,
      params: {
        apikey: MarvelApi.PUBLIC_KEY,
        hash: getHash(),
        ts: MarvelApi.TS,
        limit: this.limit,
        name: this.name,
      },
    };
    return axios.get(`${MarvelApi.URL_CHARACTERS}`,options);
  }

  
}

// ------------------------------- AXIOS ---------------------------------

// {
//   // `url` - URL-адрес сервера, который будет использоваться для запроса
//   url: '/user',

//   // `method` - это метод запроса, который следует использовать при подаче запроса
//   method: 'get', // значение по умолчанию

//   // `baseURL` будет добавляться `url`, если `url` не является абсолютным.
//   // Может быть удобно установить `baseURL` для экземпляра axios для передачи относительных URL-адресов
//   // к методам этого экземпляра.
//   baseURL: 'https://some-domain.com/api',

//   // `transformRequest`позволяет изменять данные запроса перед его отправкой на сервер
//   // Это применимо только для методов запроса 'PUT', 'POST', 'PATCH' и 'DELETE'
//   // Последняя функция в массиве должна возвращать строку или экземпляр Buffer, ArrayBuffer,
//   // FormData или Stream
//   // Вы можете изменить объект headers
//   transformRequest: [function (data, headers) {
//     // Делайте все, что хотите, чтобы преобразовать данные

//     return data;
//   }],

//   // `transformResponse` позволяет вносить изменения в данные ответа перед их передачей then/catch
//   transformResponse: [function (data) {
//     // Делайте все, что хотите, чтобы преобразовать данные

//     return data;
//   }],

//   // `headers` - это пользовательские заголовки для запроса
//   headers: {'X-Requested-With': 'XMLHttpRequest'},

//   // `params` - это URL-параметры, которые отправляются вместе с запросом
//   // Должно быть обычным объектом или объектом URLSearchParams
//   // Примечание: параметры, которые являются нулевыми или неопределенными, не отображаются в URL-адресе.
//   params: {
//     ID: 12345
//   },

//   // `paramsSerializer` это дополнительная функция, отвечающая за сериализацию `params`
//   // (например https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
//   paramsSerializer: function (params) {
//     return Qs.stringify(params, {arrayFormat: 'brackets'})
//   },

//   // `data` - это данные, которые посылаются как тело запроса
//   // Применяется только к методам запроса 'PUT', 'POST', 'DELETE , and 'PATCH'
//   // Если параметр `transformRequest` не установлен, он должен иметь один из следующих типов:
//   // - строка, обычный объект, ArrayBuffer, ArrayBufferView, URLSearchParams
//   // - Только для браузера: FormData, File, Blob
//   // - Только для Node.js: Stream, Buffer
//   data: {
//     firstName: 'Fred'
//   },

//   // альтернатива синтаксису для передачи данных в тело
//   // POST-метода
//   // отправляется только значение, а не ключ
//   data: 'Country=Brasil&City=Belo Horizonte',

//   // `timeout` указывает количество миллисекунд до истечения времени ожидания запроса.
//   // Если запрос занимает больше времени, чем `timeout`, запрос будет прерван.
//   timeout: 1000, // по умолчанию `0` (без времени ожидания)

//   // `withCredentials` указывает, будут ли межсайтовые запросы управления доступом
//   // должно быть сделано с использованием учетных данных
//   withCredentials: false, // по умолчанию

//   // `adapter`позволяет настраивать обработку запросов, что упрощает тестирование.
//   // Возвращает Promise и предоставляет действительный ответ (см. lib/adapters/README.md).
//   adapter: function (config) {
//     /* ... */
//   },

//   // `auth` указывает, что следует использовать базовую аутентификацию HTTP, и предоставляет учетные данные.
//   // Это установит заголовок `Authorization`, перезаписав любой существующий
//   // `Authorization` пользовательский заголовок, которыё вы установили с помощью `headers`.
//   // Обратите внимание, что с помощью этого параметра можно настроить только базовую аутентификацию HTTP.
//   // Для токенов Bearer и т. д. вместо этого используйте пользовательский заголовок `Authorization`.
//   auth: {
//     username: 'janedoe',
//     password: 's00pers3cret'
//   },

//   // `responseType` указывает тип данных, на которые будет отвечать сервер
//   // типы данных: 'arraybuffer', 'document', 'json', 'text', 'stream'
//   //  Только для браузера: 'blob'
//   responseType: 'json', // по умолчанию

//   // `responseEncoding` указывает кодирование для декодирования ответов (только для Node.js)
//   // Примечание: Игнорируется для `responseType` запросов 'stream' или запросов на стороне клиента
//   responseEncoding: 'utf8', // по умолчанию

//   // `xsrfCookieName` - это имя файла cookie, которое будет использоваться как значение токена xsrf
//   xsrfCookieName: 'XSRF-TOKEN', // по умолчанию

//   // `xsrfHeaderName` - это название заголовка http, содержащее значение токена xsrf
//   xsrfHeaderName: 'X-XSRF-TOKEN', // по умолчанию

//   // `onUploadProgress` позволяет обрабатывать события прогресса загрузки
//   // только для браузера
//   onUploadProgress: function (progressEvent) {
//     // Делайте все, что хотите, с родным событием прогресса
//   },

//   // `onDownloadProgress` позволяет обрабатывать события прогресса скачивания
//   // только для браузера
//   onDownloadProgress: function (progressEvent) {
//     // Делайте все, что хотите, с родным событием прогресса
//   },

//   // `maxContentLength` определяет максимальный размер содержимого ответа http в байтах, разрешенный в node.js
//   maxContentLength: 2000,

//   // `maxBodyLength` (Только для Node.js) определяет максимальный разрешенный размер содержимого HTTP-запроса в байтах.
//   maxBodyLength: 2000,

//   // `validateStatus` определяет, разрешить или отклонить Promise для данного
//   // статуса HTTP-запроса. Если `validateStatus` возвращает `true` (или установлено значение `null`
//   // или `undefined`), Promise будет возвращен; иначе, Promise будет отклонен.
//   validateStatus: function (status) {
//     return status >= 200 && status < 300; // по умолчанию
//   },

//   // `maxRedirects` определяет максимальное количество перенаправлений в node.js.
//   // Если установлено значение 0, перенаправления не будут выполняться.
//   maxRedirects: 5, // по умолчанию

//   // `socketPath` определяет UNIX Сокет для использования в node.js.
//   // например '/var/run/docker.sock' для отправки запросов к docker.
//   // Можно указать только `socketPath` или `proxy`.
//   // Если указаны оба, используется `socketPath`.
//   socketPath: null, // по умолчанию

//   // `httpAgent` и `httpsAgent` определяют пользовательский агент, который будет использоваться при выполнении http
//   // и https запросов, соответственно в node.js.Это позволяет добавлять такие параметры, как
//   // `keepAlive` который не включен по умолчанию.
//   httpAgent: new http.Agent({ keepAlive: true }),
//   httpsAgent: new https.Agent({ keepAlive: true }),

//   // `proxy` определяет имя хоста, порт и протокол прокси-сервера.
//   // Вы также можете определить свой прокси, используя обычный `http_proxy` и
//   // переменные `https_proxy`. Если вы используете переменные среды для конфигурации прокси
//   // вы также можете определить переменную `no_proxy` как список доменов, разделенных запятыми, которые не должны быть проксированы.
//   // Используйте `false`, чтобы отключить прокси, игнорируя переменные среды.
//   // `auth` указывает, что для подключения к прокси-серверу следует использовать базовую аутентификацию HTTP, и предоставляет учетные данные.
//   // Это установит заголовок `Proxy-Authorization`, перезаписав любой существующий
//   // `Proxy-Authorization` пользовательский заголовок, который вы установили в `headers`.
//   // Если прокси-сервер использует HTTPS, вы должны установить протокол `https`.
//   proxy: {
//     protocol: 'https',
//     host: '127.0.0.1',
//     port: 9000,
//     auth: {
//       username: 'mikeymike',
//       password: 'rapunz3l'
//     }
//   },

//   // `cancelToken` указывает токен отмены, который можно использовать для отмены запроса
//   // (см. подробнее в разделе Отмена запроса ниже)
//   cancelToken: new CancelToken(function (cancel) {
//   }),

//   // `decompress` указывает, следует ли распаковывать тело ответа
//   // автоматически. Если установлено значение `true`, также удалит заголовок 'content-encoding' из объектов ответов всех распакованных ответов.
//   // - Только для Node.js (XHR не может отключить декомпрессию)
//   decompress: true // по умолчанию

// }

// ------------------------------- MARVEL - API ---------------------------------

// Request Url: http://gateway.marvel.com/v1/public/comics
// Request Method: GET
// Params: {
//   "apikey": "your api key",
//   "ts": "a timestamp",
//   "hash": "your hash"
// }
// Headers: {
//   Accept: */*
// }

//RESPONCE DATA

// offset	int	The requested offset (skipped results) of the call
// limit	int	The requested result limit
// total	int	The total number of results available
// count	int	The total number of results returned by this call
// results	Array[entity type]	The list of entities returned by the call

// Запрошенное смещение (пропущенные результаты) вызова
// Запрошенный предел результата
// Общее количество доступных результатов
// Общее количество результатов, возвращенных этим вызовом
// Массив [тип объекта]	Список сущностей, возвращаемый вызовом

// {
//   "code": 200,
//   "status": "Ok",
//   "etag": "f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3",
//   "data": {
//     "offset": 0,
//     "limit": 20,
//     "total": 30920,
//     "count": 20,
//     "results": [{array of objects}}]
//   }
// }

// Characters

// id	------------ int ------------	The unique ID of the character resource.
// name	------------	string ------------		The name of the character.
// description	------------	string ------------		A short bio or description of the character.
// modified	------------	Date ------------		The date the resource was most recently modified.
// resourceURI	------------	string ------------		The canonical URL identifier for this resource.
// urls	------------	Array[Url] ------------		A set of public web site URLs for the resource.
// thumbnail	------------	Image ------------		The representative image for this character.
// comics	------------	ResourceList ------------		A resource list containing comics which feature this character.
// stories	------------	ResourceList ------------		A resource list of stories in which this character appears.
// events	------------	ResourceList ------------		A resource list of events in which this character appears.
// series	------------	ResourceList ------------		A resource list of series in which this character appears.

// Comics

// id	int	The unique ID of the comic resource.
// digitalId	int	The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally.
// title	string	The canonical title of the comic.
// issueNumber	int	The number of the issue in the series (will generally be 0 for collection formats).
// variantDescription	string	If the issue is a variant (e.g. an alternate cover, second printing, or director's cut), a text description of the variant.
// description	string	The preferred description of the comic.
// modified	Date	The date the resource was most recently modified.
// isbn	string	The ISBN for the comic (generally only populated for collection formats).
// upc	string	The UPC barcode number for the comic (generally only populated for periodical formats).
// diamondCode	string	The Diamond code for the comic.
// ean	string	The EAN barcode for the comic.
// issn	string	The ISSN barcode for the comic.
// format	string	The publication format of the comic e.g. comic, hardcover, trade paperback.
// pageCount	int	The number of story pages in the comic.
// textObjects	Array[TextObject]	A set of descriptive text blurbs for the comic.
// resourceURI	string	The canonical URL identifier for this resource.
// urls	Array[Url]	A set of public web site URLs for the resource.
// series	SeriesSummary	A summary representation of the series to which this comic belongs.
// variants	Array[ComicSummary]	A list of variant issues for this comic (includes the "original" issue if the current issue is a variant).
// collections	Array[ComicSummary]	A list of collections which include this comic (will generally be empty if the comic's format is a collection).
// collectedIssues	Array[ComicSummary]	A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine").
// dates	Array[ComicDate]	A list of key dates for this comic.
// prices	Array[ComicPrice]	A list of prices for this comic.
// thumbnail	Image	The representative image for this comic.
// images	Array[Image]	A list of promotional images associated with this comic.
// creators	ResourceList	A resource list containing the creators associated with this comic.
// characters	ResourceList	A resource list containing the characters which appear in this comic.
// stories	ResourceList	A resource list containing the stories which appear in this comic.
// events	ResourceList	A resource list containing the events in which this comic appears.
