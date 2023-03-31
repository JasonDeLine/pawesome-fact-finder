// urls to api calls
var catFactURL = "https://meowfacts.herokuapp.com/?count=1";
var catPicURL = "http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true";
var dogFactURL = "https://dogapi.dog/api/v2/facts?limit=1";
var dogPicURL = "https://dog.ceo/api/breeds/image/random";

// variables to store results from api calls
var catFact = "";
var catPic = "";
var dogFact = "";
var dogPic = "";

// elements to show results on screen ~ in future we can create these elements in the html where we want them and then replace
// these with getElementByID
var catButton = document.getElementById("catButton");
var dogButton = document.getElementById("dogButton");
var luckyButton = document.createElement("button");
var catImg = document.createElement("catImg");
var dogImg = document.createElement("dogImg");
var catText = document.getElementById("catText");
var dogText = document.getElementById("dogText");

// this function gets all the facts from local storage as an array
function getFacts() {
  allFacts = JSON.parse(localStorage.getItem("facts"));
  if (allFacts === null) {
    allFacts = [];
  }
}

// events to listen for when one of the 3 buttons is pressed. Once pressed, the variables to store results are reset and the picture and fact function is called
catButton.addEventListener("click", function () {
  getFacts();
  catFact = "";
  catPic = "";
  getCatPicture();
  getCatFact();
});

dogButton.addEventListener("click", function () {
  getFacts();
  dogFact = "";
  dogPic = "";
  getDogPicture();
  getDogFact();
});

luckyButton.addEventListener("click", function () {
  getFacts();
  dogFact = "";
  dogPic = "";
  catFact = "";
  catPic = "";
  getCatPicture();
  getCatFact();
  getDogPicture();
  getDogFact();
});

// this function times out the script for a specific amount of milliseconds
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// once the dog/lucky button is pressed this function calls the api to get the dog picture and sets it to the element and displays it on page
async function getDogPicture() {
  console.log("DOG PICTURE!");
  fetch(dogPicURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      dogPic = data.message;
      console.log("Here is the dog picture: " + dogPic);
    });

  await delay(800); // delay is here to ensure the call to the api is complete otherwise we might set the src attribute while dogPic is empty

  dogImg.setAttribute("src", dogPic);
  document.body.appendChild(dogImg);
}

// once the dog/lucky button is pressed this function calls the api to get the dog fact and sets it to the element and displays it on page
async function getDogFact() {
  console.log("DOG FACT!");

  do {
    // does once to get a fact and then keeps getting facts if the fact is already in local storage ~ loop ends when its a new fact
    fetch(dogFactURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        dogFact = data.data[0].attributes.body;
        console.log("Here is the dog fact: " + dogFact);
      });
  } while (dogFact in allFacts);

  await delay(800); // delay is here to ensure the call to the api is complete otherwise we might set the attribute while data is empty
  dogText.innerHTML = dogFact;
  allFacts.push(dogFact);
  localStorage.setItem("facts", JSON.stringify(allFacts)); // adds new fact to array and to local storage
  // document.getElementById(dogText).appendChild;
}

// once the cat/lucky button is pressed this function calls the api to get the cat picture and sets it to the element and displays it on page
async function getCatPicture() {
  console.log("CAT PICTURE!");
  fetch(catPicURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      catPic = data[0];
      console.log("Here is the cat picture: " + catPic);
    });
  await delay(800); // delay is here to ensure the call to the api is complete otherwise we might set the attribute while data is empty
  catImg.setAttribute("src", catPic);
  document.body.appendChild(catImg);
}

// once the cat/lucky button is pressed this function calls the api to get the dog fact and sets it to the element and displays it on page
async function getCatFact() {
  console.log("CAT FACT!");

  do {
    // does once to get a fact and then keeps getting facts if the fact is already in local storage ~ loop ends when its a new fact
    fetch(catFactURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        catFact = data.data[0];
        console.log("Here is the cat fact: " + catFact);
      });
  } while (catFact in allFacts);

  await delay(800);
  catText.innerHTML = catFact; // delay is here to ensure the call to the api is complete otherwise we might set the attribute while data is empty
  allFacts.push(catFact);
  localStorage.setItem("facts", JSON.stringify(allFacts)); // adds new fact to array and to local storage
  // document.getElementById(catText).appendChild;
}

// main function ~ adds buttons to screen and adds alt text to imgs
$(function () {
  getFacts();
});
