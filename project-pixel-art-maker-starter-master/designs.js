/**
* @description A single-page web app that allows users to draw pixel art on a customizable canvas!
* @constructor
* @param {string} title - Pixel Art Maker
* @param {string} author - Akindipe Bukola Abiola (Advanced African scholar)
*/


// Select color input
const colorInput = document.querySelector('#colorPicker').value;

//Select pixel canvas
const pixelCanvas = document.querySelector('#pixelCanvas');

// Select size input
const sizeInput = document.querySelector('#sizePicker');

// When size is submitted by the user, call makeGrid()

function makeGrid() {
  let gridHeight = document.querySelector('#inputHeight').value;
  let gridWidth = document.querySelector('#inputWidth').value;

  // Clear the canvas after every 'submit' event
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
    }

  // Creating rows and cells in the table
  for (let i = 1; i <= gridHeight; i++) {
    let gridRow = document.createElement('tr');
    pixelCanvas.appendChild(gridRow);

    for (let j = 1; j <= gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridRow.appendChild(gridCell);

      // Fills cell with selected color when mouse is pressed ('mousedown', unlike 'click', doesn't also require release of mouse button)
      gridCell.addEventListener('mousedown', function() {
        const cellColor = document.querySelector('#colorPicker').value;
        gridCell.style.backgroundColor = cellColor;
      })
     }
  }
}

makeGrid();

// using the event method preventDefault() to first intercepting the 'submit' event, which would normally submit the form and refresh the page and preventing makeGrid() from being processed.
sizePicker.addEventListener('submit', function(event) {
  event.preventDefault();
  makeGrid();
});

// Enabling color dragging with the selected color 
let down = false; // Tracks whether or not mouse pointer is pressed

// Listens for mouse pointer press and release on grid. Changes value to true when pressed, but sets it back to false as soon as released
pixelCanvas.addEventListener('mousedown', function(event) {
	down = true;
	pixelCanvas.addEventListener('mouseup', function() {
		down = false;
	});
  // Prevents cells from coloring if grid is left while pointer is pressed down
  pixelCanvas.addEventListener('mouseleave', function() {
    down = false;
  });

  pixelCanvas.addEventListener('mouseover', function(event) {
    
    const color = document.querySelector('#colorPicker').value;
    // While mouse pointer is pressed and within grid boundaries, fills cell with selected color. 
  	if (down) {
      // 'TD' capitalized because element.tagName returns upper case for DOM trees that represent HTML elements
      if (event.target.tagName === 'TD') {
      	event.target.style.backgroundColor = color;
      }
    }
  });
});

// Removes color from cell upon double-click
pixelCanvas.addEventListener('dblclick', function(e) {
  e.target.style.backgroundColor = null;
});

