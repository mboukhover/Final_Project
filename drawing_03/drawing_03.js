const canvas = document.getElementById('drawing');
const context = canvas.getContext('2d');

var referenceWidth = 1200;
var referenceHeight = 400;
var pixelScale = window.devicePixelRatio;

var video = document.querySelector('video');
video.addEventListener('loadeddata', setup);

function setup() {
  // set the display size
  canvas.style.width = referenceWidth + 'px';
  canvas.style.height = referenceHeight + 'px';

  // Set actual device pixels
  canvas.width = referenceWidth * pixelScale;
  canvas.height = referenceHeight * pixelScale;

  // normalize the coordinate system
  context.scale(pixelScale, pixelScale);

  draw();
}

function draw() {
  var imgScale = 10;

  context.drawImage(video, 0, 0, 1200 / (imgScale * pixelScale), 400 / (imgScale * pixelScale));

  var imageData = context.getImageData(0, 0, referenceWidth/imgScale, referenceHeight/imgScale);
  var data = imageData.data;
  //console.log(data.length)

  context.clearRect(0, 0, referenceWidth, referenceHeight);

  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {
      var index = (x + y * imageData.width) * 4; // index position of every pixel

      var r = data[index + 0]; // red
      var g = data[index + 1]; // green
      var b = data[index + 2]; // blue
      var a = data[index + 3]; // alpha

      var bright = (r+g+b)/3
      console.log(bright)

      if (bright <= 100){
        context.fillStyle = 'rgba(210, 217, 209, .5)';
        }

      else if (bright > 101 && bright <= 120){
        context.fillStyle = 'rgba(181, 190, 181, .5)';
        }

      else if (bright > 121){
        context.fillStyle = 'rgba(116, 134, 142, .5)';
        }

      context.save(); // optional
      context.translate(imgScale/2, imgScale/2); // optional
      context.beginPath();
      context.arc(x * imgScale, y * imgScale, imgScale / 2, 0, Math.PI * 2);
      context.fill()
      context.restore();
    }
  }

  context.putImageData(imageData, 0, 0);

  requestAnimationFrame(draw);
}
