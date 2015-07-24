// ==UserScript==
// @name        hackathon
// @namespace   iconbuyit
// @description for HDD
// @include     http*://www.amazon.co.jp/*
// @version     1
// @grant       none
// ==/UserScript==

var load = window.setTimeout(function() {
  var prodDetails = document.getElementById('prodDetails');
  prodDetails.parentNode.removeChild(prodDetails);
  
  var child = document.getElementsByClassName('small')[0]
  child.parentNode.insertBefore(prodDetails,child);
  
  var stl = document.createElement('style');
  stl.type = 'text/css';
  var css = document.createTextNode('ul.icons { list-style-type: none; margin: 0px 5px auto 0px; padding: 0 0 30px 0;} ul.icons li { display: inline; } ul.icons li a { color: #42454a; border: 1px solid #c9c3ba; padding: 10px; text-decoration: none; width: 115px; height: 40px; }');
  stl.appendChild(css);
  var head = document.getElementsByTagName('head');
  head[0].appendChild(stl);
});