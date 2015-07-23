// ==UserScript==
// @name         IconBuyyIt
// @version      0.1
// @description  enter something useful
// @author       jingxuaw@, locheng@, kentoh@
// @include      http://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

//debugger;

function CreateImageElement(src) {
    var img = document.createElement('img');
    //img.setAttribute('class', 'iconize');
    img.src = src;
    return img;
}

function CreateIconContainer(features) {
    var iconDiv = document.createElement('div');
    var featureId = 0;
    var colCount = 3;
    for (var row = 0; row < Math.floor((features.length - 1) / colCount) + 1; ++row) {
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'icons');
        for (var col = 0; col < colCount; ++col) {
            if (featureId >= features.length) break;
            var li = document.createElement('li');
            var iconSpan = document.createElement('span');
            iconSpan.appendChild(CreateImageElement(getFeatureURL(features[featureId]["featureName"])));
            var textSpan = document.createElement('span');
            textSpan.appendChild(document.createTextNode(features[featureId]["value"]));
            li.appendChild(iconSpan);
            li.appendChild(textSpan);
            ul.appendChild(li);
            featureId++;
        }
        iconDiv.appendChild(ul);
    }
    nodeAfter = document.getElementById('bottomRow');
    nodeAfter.parentNode.insertBefore(iconDiv, nodeAfter);
}

function AppendIconizeStyle() {
    var stl = document.createElement('style');
    stl.type = 'text/css';
    var css = document.createTextNode('ul.icons { list-style-type: none; margin: 0px 5px auto 0px; padding: 0 0 30px 0;} ul.icons li { display: inline; padding: 0 10px 0 10px; width: 33.3333%; height: 60px; } ul.icons li span { color: #42454a; border: 1px solid #c9c3ba; padding: 10px; text-decoration: none; width: 115px; height: 100px; }');
    stl.appendChild(css);
    var head = document.getElementsByTagName('head');
    head[0].appendChild(stl);
}

function getFeatureURL(featureName) {
    return "https://github.com/floydSJTU/iconbuyit/raw/master/icons/" + featureName + "_icon.png";
}

AppendIconizeStyle();


features = [{"featureName": "weight", "value": "136g"}, {"featureName": "size", "value": "1.5 * 8.2 * 11cm"}, {"featureName": "drive_hdd", "value": "100T"}, {"featureName": "brand", "value": "western_digital"}];

CreateIconContainer(features);
