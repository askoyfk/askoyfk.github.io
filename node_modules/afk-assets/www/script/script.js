var log = console.log.bind(console);


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



// pseudo navigation for design purposes

var nav = [].slice.call(document.querySelectorAll('nav ul li'));
var main = document.querySelector('main');

nav.forEach(function(li) {
    li.addEventListener('click', navigate);
})



var firstpage = true;

function navigate(e) {

    if (firstpage === true) {
        var plakat = document.querySelector('#plakat');
        plakat.parentNode.removeChild(plakat);

        var sponsorer = document.querySelector('#sponsorer');
        sponsorer.parentNode.removeChild(sponsorer);

        firstpage = false;
    };

    var page = e.target.childNodes[0].nodeValue.toLowerCase();
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'fragments/' + page + '.html');
    xhr.send();

    xhr.onload = function() {
        main.innerHTML = marked(this.response);
        main.setAttribute('class', page + ' subpage');
    }

};


// go directly to specified page
// !function(){
//
//     var page = 'kontakt';
//
//     navigate({
//         target: {
//             childNodes: [{
//                 nodeValue: page
//             }]
//         }
//     })
// }()
