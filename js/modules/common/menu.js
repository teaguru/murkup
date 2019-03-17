    var elem = document.querySelector(".logo-item");
    var elem2 = document.querySelector(".logo-menu");
    var block = document.querySelectorAll(".dropdown-child");
        elem.onclick = function(){
        for(var i in Object.keys(block))  (block[i].classList.add('new-menu'));
        console.log(block);

    }

    elem2.onclick = function() {
        for (var i in Object.keys(block))  (block[i].classList.remove('new-menu'));
        console.log(block);
    }