const canvas = document.getElementById('drawing');
const context = canvas.getContext('2d');

var referenceWidth = 1500;
var referenceHeight = 500;
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

  context.drawImage(video, 0, 0, 1500 / (imgScale * pixelScale), 500 / (imgScale * pixelScale));

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

      var bright = (r+g+b)/3
      //console.log(bright)

      if (bright <= 130){
        context.fillStyle = 'rgba(210, 217, 209, .4)'; //lightest green
        }

      else if (bright >= 131 && bright <= 144){
        context.fillStyle = 'rgba(181, 190, 181, .4)'; //darker green
        }

      else if (bright >= 145 && bright <= 160){
        context.fillStyle = 'rgba(130, 190, 204, .4)';  //darker blue green
        }

      else {
        context.fillStyle = 'rgba(230, 190, 204, .4)'; //light pink
        }


      context.save(); // optional
      context.translate(imgScale/2, imgScale/2); // optional
      context.beginPath();
      context.arc(x * imgScale, y * imgScale, imgScale / 2, 0, Math.PI * 2);
      context.fill()
      context.restore();
    }
  }

  requestAnimationFrame(draw);
}
