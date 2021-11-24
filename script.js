const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class and ID attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute('id', 'cardBack');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let selected = [];
let matched = [];
let abort = false;

// TODO: Implement this function!
function handleCardClick(event) {
  if(abort) return;
  // you can use event.target to see which element was clicked
  let clicked = event.target;
  // console.log("You clicked", clicked);

  if(clicked.id === 'cardBack'){
    clicked.removeAttribute('id');
    selected.push(clicked);

    if(selected.length === 2){
      abort = true;
      
      if(selected[0].getAttribute('class') === selected[1].getAttribute('class')){
        setTimeout(function(){
          matched.push(selected[0]);
          matched.push(selected[1]);
          selected = [];

          if(matched.length < 10){
            alert('Match!');
            abort = false;
          }
          else{
            alert('You Win!');
          }
        }, 0);
      }
      else{
        setTimeout(function(){
          alert('Sorry, Try Again.');
          selected[0].setAttribute('id', 'cardBack');
          selected[1].setAttribute('id', 'cardBack');
          selected = [];
          abort = false
        }, 1000);
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
