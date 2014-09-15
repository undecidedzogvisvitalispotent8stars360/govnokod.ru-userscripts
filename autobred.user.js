﻿// ==UserScript==
// @name govnokod: autobred
// @namespace govnokod
// @description sends something strange
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 1.0.0
// @grant none
// ==/UserScript==

function count(x){ return x.length == null ? Object.keys(x).length : x.length; }
function mb_strlen(s){ return s.length; }
function mb_substr(str, start, length){ return str.substr(start, length); }
function mt_rand(a, b){ return Math.random() * (b-a) + a | 0; }

// Адаптированный код inkanus-gray
// http://govnokod.ru/16567#comment247654

function stringToPairs($s, $chlen, $base) {
  var $pairs = {};
  for (var $i = 0; $i < mb_strlen($s) - $base; $i++) {
    var s = mb_substr($s, $i, $base);
    if(!(s in $pairs)) $pairs[s] = [];
    $pairs[s].push(mb_substr($s, $i + $base, $chlen));
  }
  return $pairs;
}
 
function getNextSym($s, $pairs) {
  var $next = $pairs[$s] || [];
  var $length = count($next);
  return ($length > 0) ? $next[mt_rand(0, $length -1)] : '';
}
 
function right($s, $len) {
  return mb_substr($s, mb_strlen($s) - $len, $len);
}
 
function bugurt($start, $pairs, $len, $base) {
  var $result = $start;
  while ($len > 0 && $start !== '') {
    $start = getNextSym(right($result, $base), $pairs);
    $result += $start;
    $len--;
  }
  return $result;
}
 
function bred($text, $textlen, $base, $chlen) {
  return bugurt(mb_substr($text, 0, $base), stringToPairs($text, $chlen, $base), $textlen, $base);
}

// Берём текст из комментариев и отвечаем.

function es(s){ return Array.prototype.slice.apply(document.querySelectorAll(s)); }
function e(id){ return document.getElementById(id); }

(function(){

  var base = es('.comment-text').map(function(x){ return x.innerText; }).join(' ');
  // var comments = es('a.comment-link').map(function(x){ return /comment(\d+)/.exec(x.href)[1]; });
  var answerButtons = es('a.answer');
  var form = document.forms[0];

  if(
    document.forms.length === 1 && base.length > 200 &&
    answerButtons.length && Math.random() < 0.1
  ){
    answerButtons[mt_rand(0, answerButtons.length)].onclick();
    e('formElm_text').value = bred(base, 300, 4, 2);
    form.onsubmit();
  }
  
})();