"use strict";

var wordlistDiv = "wordlist";
var studentAnswerDiv = "student_answer";
var wordDisplayDiv = "word_display";
var studentAnswerInputDiv = "student_answer_input_div";
var studentAnswerInputId = "student_answer_input_id";
var hiddenWordId = "hidden_word_id";
var wordTextId = "word_text";
var buttonSuffix = "_button";
var answerSuffix = "_answer";
var masterSuffix = "_master";
var emptyButtonClass = "btn btn-outline-primary btn-sm";
var correctButtonClass = "btn btn-success btn-sm";
var incorrectButtonClass = "btn btn-danger btn-sm";
var bodyTextClass = "text-body";
var incorrectTextClass = "text-danger";
var correctTextClass = "text-success";
var secondaryTextClass = "text-secondary";
var primaryTextClass = "text-primary";
var waitTime = 1000;

function delay(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}

function spellWord(word, wordId) {
  var wordlistElement, studentAnswerElement, wordDisplayElement, studentAnswerInputDivElement, studentAnswerInputElement, hiddenWordElement, wordTextElement, answerWordElement;
  return regeneratorRuntime.async(function spellWord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wordlistElement = document.getElementById(wordlistDiv);
          studentAnswerElement = document.getElementById(studentAnswerDiv);
          wordDisplayElement = document.getElementById(wordDisplayDiv);
          studentAnswerInputDivElement = document.getElementById(studentAnswerInputDiv);
          studentAnswerInputElement = document.getElementById(studentAnswerInputId);
          hiddenWordElement = document.getElementById(hiddenWordId);
          wordTextElement = document.getElementById(wordTextId);
          answerWordElement = document.getElementById(wordId + answerSuffix);
          hiddenWordElement.value = wordId;
          studentAnswerInputElement.value = answerWordElement.value;
          wordlistElement.style.display = "none";
          studentAnswerElement.style.display = "block";
          wordDisplayElement.style.display = "block";
          studentAnswerInputDivElement.style.display = "none";
          wordTextElement.innerHTML = word;
          _context.next = 17;
          return regeneratorRuntime.awrap(delay(waitTime));

        case 17:
          wordDisplayElement.style.display = "none";
          studentAnswerInputDivElement.style.display = "block";

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}

function recordStudentAnswer() {
  var wordlistElement = document.getElementById(wordlistDiv);
  var studentAnswerElement = document.getElementById(studentAnswerDiv);
  var currentWordId = document.getElementById(hiddenWordId).value;
  var wordMasterValue = document.getElementById(currentWordId + masterSuffix).value;
  var studentAnswerValue = document.getElementById(studentAnswerInputId).value;
  var wordButtonElement = document.getElementById(currentWordId + buttonSuffix);
  var answerWordElement = document.getElementById(currentWordId + answerSuffix);
  var event = new Event('change');
  answerWordElement.value = studentAnswerValue;
  answerWordElement.dispatchEvent(event); // Hide the student Answer form

  studentAnswerElement.style.display = "none";
  wordlistElement.style.display = "block";
}

function setButtonColourOnEntry() {
  var wordcountElement = document.getElementById("line_items");
  var wordcount = parseInt(wordcountElement.value);

  for (var i = 0; i < wordcount; i++) {
    var wordPrefix = 'word' + (i + 1).toString().padStart(2, '0');
    var masterId = wordPrefix + masterSuffix;
    var answerId = wordPrefix + answerSuffix;
    var buttonId = wordPrefix + buttonSuffix;
    updateButtonColour(masterId, answerId, buttonId);
  }
}

function updateButtonColour(masterId, answerId, buttonId) {
  answerElement = document.getElementById(answerId);
  masterElement = document.getElementById(masterId);
  buttonElement = document.getElementById(buttonId);

  if (answerElement.value == "") {
    buttonElement.className = emptyButtonClass;
  } else if (masterElement.value == answerElement.value) {
    buttonElement.className = correctButtonClass;
  } else {
    buttonElement.className = incorrectButtonClass;
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  var element = document.getElementById(ev.target.id);
  ev.dataTransfer.setData("sourceId", element.id);
  ev.dataTransfer.setData("sourceParentId", element.parentElement.id);
}

function drop(ev, defaultValue) {
  ev.preventDefault();
  var sourceId = ev.dataTransfer.getData("sourceId");
  var sourceParentId = ev.dataTransfer.getData("sourceParentId");
  var sourceParentElement = document.getElementById(sourceParentId);
  var newChild = document.getElementById(sourceId);

  if (ev.target.hasChildNodes()) {
    ev.target.replaceChild(newChild, ev.target.firstChild);
  } else {
    ev.target.appendChild(newChild);
  }

  if (defaultValue) {
    var newSpan = document.createElement('span');
    newSpan.innerHTML = defaultValue;
    newSpan.className = primaryTextClass;
    newSpan.draggable = true;
    sourceParentElement.appendChild(newSpan);
  }
}

function toggleButtonClass(element) {
  if (element.className == correctButtonClass) {
    element.className = emptyButtonClass;
  } else {
    element.className = correctButtonClass;
  }
}

function toggleTextClass(element, partnerId) {
  var partnerElement = document.getElementById(partnerId);

  if (element.className == correctTextClass) {
    element.className = secondaryTextClass;
    partnerElement.className = correctTextClass;
  } else {
    element.className = correctTextClass;
    partnerElement.className = secondaryTextClass;
  }
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


function toggleDropdown(dropdownId) {
  document.getElementById(dropdownId).classList.toggle("er-show");
} // Close the dropdown menu if the user clicks outside of it


window.onclick = function (event) {
  if (!event.target.matches('.er-span')) {
    // var dropdowns = document.getElementsByClassName("er-dropdown-content");
    var dropdowns = document.getElementsByClassName("er-dropdown-content");
    var i;

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];

      if (openDropdown.classList.contains('er-show')) {
        openDropdown.classList.remove('er-show');
      }
    }
  }
};

function setSelectedValue(spanId, selectedElement) {
  spanElement = document.getElementById(spanId);
  spanElement.innerHTML = selectedElement.innerHTML;
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function uncapitalizeFirstLetter(val) {
  return String(val).charAt(0).toLowerCase() + String(val).slice(1);
}

function addFullstop(val) {
  return val + ".";
}

function removeFullstop(val) {
  return val.replace(/\.$/g, '');
}

function modifyWord(actionElementId, currentElement, answerElementId) {
  var CAPITALISE = 'CAPITALISE';
  var UNCAPITALISE = 'UNCAPITALISE';
  var ADD_FULLSTOP = 'ADD_FULLSTOP';
  var REMOVE_FULLSTOP = 'REMOVE_FULLSTOP';
  actionElement = document.getElementById(actionElementId);
  answerElement = document.getElementById(answerElementId + "_answer");
  parentElement = document.getElementById(answerElementId + "_parent");

  if (actionElement.value == CAPITALISE) {
    currentElement.innerHTML = capitalizeFirstLetter(currentElement.innerHTML);
  } else if (actionElement.value == UNCAPITALISE) {
    currentElement.innerHTML = uncapitalizeFirstLetter(currentElement.innerHTML);
  } else if (actionElement.value == ADD_FULLSTOP) {
    currentElement.innerHTML = addFullstop(currentElement.innerHTML);
  } else if (actionElement.value == REMOVE_FULLSTOP) {
    currentElement.innerHTML = removeFullstop(currentElement.innerHTML);
  } // Set the answer element value


  var allWords = parentElement.children;
  var answer = "";

  for (var i = 0; i < allWords.length; i++) {
    answer += allWords[i].innerHTML + " ";
  }

  answerElement.value = answer.trim();
}