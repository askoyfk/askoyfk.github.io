(function () {

    var parent = document.createElement('div');
    parent.classList.add('boxes');

    for (var i = 1, stop = 14; i < stop; i++) {

        var txt = document.createTextNode('Boks ' + ( i < 10 ? '0' + i : i ));


        var div = document.createElement('div');
        div.classList.add('box');
        div.appendChild(txt);

        if (i === 2) {
            div.appendChild(document.createElement('br'));
            div.appendChild(document.createTextNode('Denne boksen har mer tekst enn de andre boksene fordi sånn er det bare'));
        }

        parent.appendChild(div);
    };

    document.getElementsByTagName('main')[0].appendChild(parent);


})();
