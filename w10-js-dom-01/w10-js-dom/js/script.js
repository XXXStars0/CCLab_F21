

let x = 0;
let g = 0;

function addDiv() {
  // create a HTML element!
  let newElt = document.createElement( "div" );
  // change its properties
  newElt.style.backgroundColor = "gray";
  newElt.style.width = "50px";
  newElt.style.height = "50px";
  newElt.style.margin = "30px";
  // attach the elt to the document
  //document.body.appendChild( newElt );
  document.getElementById('box').appendChild( newElt );
}

function change() {
  //x += 20;
  g += 10;

  let b = document.getElementById('box');
  b.innerHTML = "WOW!";
  b.style.left = x + "px";
  b.style.backgroundColor = "rgb(255, " + g + ", 0)";
}
