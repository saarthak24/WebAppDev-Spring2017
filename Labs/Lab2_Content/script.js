function nextElement(event) {
    var tgt = event.target;
    if (tgt.children.length == 0) {
        if (tgt.nextElementSibling == null) {
            if (tgt == document.getElementById("last")) {
                tgt = tgt.parentNode.parentNode.previousElementSibling.previousElementSibling;
                fade(tgt);
            } else {
                while (tgt.parentNode.nextElementSibling == null) {
                    tgt = tgt.parentNode;
                }
                tgt = tgt.parentNode.nextElementSibling;
                fade(tgt);
            }
        } else {
            tgt = tgt.nextElementSibling;
            fade(tgt);
        }
    } else {
        tgt = tgt.children[0];
        fade(tgt);
    }
}

function fade(tgt) {
    $(tgt).fadeToggle("fast");
    $(tgt).fadeToggle("fast");
}
