const gallery = document.querySelector('#container');
const images = document.querySelectorAll('img');

function changeOpacity(event) {
  if (event.target.tagName == 'IMG') {
    for (var i = 0; i < images.length; i++) {
      images[i].className = 'semitransparent';
    }
    event.target.className = "opaque";
    event.target.addEventListener('mouseout', resetOpacity);
  }
  event.stopPropagation();
}

function resetOpacity() {
  for (var i = 0; i < images.length; i++) {
    images[i].className = 'opaque';
  }
}

gallery.addEventListener('mouseover', changeOpacity);
