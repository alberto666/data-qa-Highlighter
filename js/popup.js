// Scripts for the popup

var found = document.getElementById("found");
var foundHtml = 'No elements found in the DOM, but you can check this <a href=\"https://output.jsbin.com/sikokog\" target=\"_blank\" class="link">demo page</a>';


// Number of data-qa elements found in the DOM
function getDOM() {
    return document.querySelectorAll('[data-qa], [data-test]').length;
}

//Highlight QA elements
function qame() {
    var qameBtn = document.getElementById("qame");
    qameBtn.innerHTML = 'data-qa showed!!';
    setTimeout(function () {
        qameBtn.innerHTML = 'HIGHLIGHT data-qa';
    }, 1000);
    //Current tab functions
    browser.tabs.executeScript(null, {
        //Removing previous extension content in DOM
        file: '/js/unqame.js'
    });
    browser.tabs.executeScript(null, {
        //Adding extension content in DOM
        file: '/js/qame.js'
    });
    // Number of data-qa elements found in the DOM
    chrome.tabs.executeScript({
        code: '(' + getDOM + ')();'
    }, (results) => {
        if (results[0] > 0) {
            found.innerHTML = results[0] + ' elements found in the DOM';
            return false;
        }
        else {
            found.innerHTML = foundHtml;
        }
    });
    found.innerHTML = foundHtml;
    return false;
}

//Remove QA elements
function unqame() {
    var unQameBtn = document.getElementById("unqame");
    unQameBtn.innerHTML = 'data-qa removed!!';
    setTimeout(function () {
        unQameBtn.innerHTML = 'REMOVE data-qa';
    }, 1000);
    //Current tab functions
    browser.tabs.executeScript(null, {
        //Removing extension content in DOM
        file: '/js/unqame.js'
    });
    found.innerHTML = 'Highlighted data-qa removed !!'
}

document.getElementById('qame').addEventListener('click', qame);
document.getElementById('unqame').addEventListener('click', unqame);

