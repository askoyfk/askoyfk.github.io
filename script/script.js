var menu = document.querySelector('nav'), header = document.querySelector('header'), wrapper = document.getElementById('wrapper');

var hugeMin = window.matchMedia('(min-width: 1280px)');
var smallMax = window.matchMedia('(max-width: 767px)');

hugeMin.addListener(testMedia);
testMedia(hugeMin);

smallMax.addListener(testMedia);
testMedia(smallMax);

function testMedia(mq) {
    if (hugeMin.matches) {
        header.appendChild(menu);
    } else if (smallMax.matches) {
        wrapper.parentNode.insertBefore(menu, wrapper.nextSibling);
    } else {
        header.parentNode.insertBefore(menu, header.nextSibling);
    }
}
