const canvas = document.getElementById('noise');
const context = canvas.getContext('2d');

var referenceWidth;
var referenceHeight;

function setup() {
  // determine the width and height
  referenceWidth = window.innerWidth;
  referenceHeight = window.innerHeight;

  // set the display size
  canvas.style.width = referenceWidth + 'px';
  canvas.style.height = referenceHeight + 'px';

  // Set actual device pixels
  var scale = 1; // window.devicePixelRatio;
  // console.log(scale);
  canvas.width = referenceWidth * scale;
  canvas.height = referenceHeight * scale;

  // normalize the coordinate system
  context.scale(scale, scale);
}

function draw() {
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixelData = pixels.data;
  // console.log(pixelData.length);

  for (var y = 0; y < canvas.height; y++) { // for every row
    for (var x = 0; x < canvas.width; x++) { // visit every column (pixel)
      var index = (x + y * canvas.width) * 4; // index position of every pixel!
      pixelData[index + 0] = Math.floor(Math.random() * 255); // red
      pixelData[index + 1] = Math.floor(Math.random() * 150); // green
      pixelData[index + 2] = Math.floor(Math.random() * 255); // blue
      pixelData[index + 3] = 200; // alpha
    }
  }

  context.putImageData(pixels, 0, 0);

  requestAnimationFrame(draw);
}

setup();
draw();

window.addEventListener('resize', setup);
