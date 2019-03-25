//variables
    var elem = document.querySelector(".logo-item");
    var elem2 = document.querySelector(".logo-menu");
    var block = document.querySelectorAll(".header__item");
//declaretion of visibility
    for(var i in Object.keys(block))  (block[i].classList.add('no-menu'));
    elem.classList.add('no-menu');
           elem2.onclick = function(){
        for(var i in Object.keys(block))  (block[i].classList.add('new-menu'));
            for(var i in Object.keys(block))  (block[i].classList.remove('no-menu'));
               elem2.classList.add('no-menu');
               elem2.classList.remove('new-menu');
               elem.classList.add('new-menu');
               elem.classList.remove('no-menu');

    }

    elem.onclick = function(){
        for(var i in Object.keys(block))  (block[i].classList.add('no-menu'));
        for(var i in Object.keys(block))  (block[i].classList.remove('new-menu'));
        elem.classList.add('no-menu');
        elem.classList.remove('new-menu');
        elem2.classList.add('new-menu');
        elem2.classList.remove('no-menu');

    }