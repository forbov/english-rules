"use strict";

var emptyButtonClass = "btn btn-outline-primary btn-sm";
var correctButtonClass = "btn btn-success btn-sm";
var incorrectButtonClass = "btn btn-danger btn-sm";

function toggleButtonClass(element) {
  element.classList.toggle(correctButtonClass);
}