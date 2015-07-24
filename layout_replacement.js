// ==UserScript==
// @name        hackathon
// @namespace   iconbuyit
// @description for HDD
// @include     http*://www.amazon.co.jp/*
// @version     1
// @grant       none
// ==/UserScript==

function change_layout() {
  var prodDetails = document.getElementById('prodDetails');
  prodDetails.parentNode.removeChild(prodDetails);
});
