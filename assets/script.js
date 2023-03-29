var RequestUrl = 'https://meowfacts.herokuapp.com/?count=1'; // cat facts - this gives a random fact every call
var RequestUrl2 = 'http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true'; // cat/shibe/birds pictures - random img every call
var RequestUrl3 = 'https://dogapi.dog/api/v2/facts?limit=1' // dog facts - every call gives a random fact
var RequestUrl4 = 'https://dog.ceo/api/breeds/image/random' // dog pictures - every call gives a random dog
function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getApi(RequestUrl);

getApi(RequestUrl2);

getApi(RequestUrl3);

getApi(RequestUrl4);