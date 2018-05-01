const canvas = document.getElementById('c1');
const context = canvas.getContext('2d');

var referenceWidth = 700;
var referenceHeight = 500;
var pixelScale = window.devicePixelRatio;

var train = document.getElementById('train');
train.addEventListener('loadeddata', setup);

function setup() {
  canvas.style.width = referenceWidth + 'px';
  canvas.style.height = referenceHeight + 'px';

  var scale = window.devicePixelRatio;
  canvas.width = referenceWidth * scale;
  canvas.height = referenceHeight * scale;

  context.scale(scale, scale);

  draw();
}

function draw() {

  context.drawImage(train, 0, 0, referenceWidth, referenceHeight);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] = data[i + 300] + 70;
        data[i + 1] = data[i + 1];
        data[i + 2] = data[i + 400] + 50;
      }

    context.putImageData(imageData, 0, 0);

  requestAnimationFrame(draw);
}
