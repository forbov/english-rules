const wordlistDiv = "wordlist";
const studentAnswerDiv = "student_answer";
const wordDisplayDiv = "word_display";
const studentAnswerInputDiv = "student_answer_input_div";
const studentAnswerInputId = "student_answer_input_id";
const hiddenWordId = "hidden_word_id";
const wordTextId = "word_text";
const buttonSuffix = "_button";
const answerSuffix = "_answer";
const masterSuffix = "_master";
const emptyButtonClass = "btn btn-outline-primary btn-sm";
const correctButtonClass = "btn btn-success btn-sm";
const incorrectButtonClass = "btn btn-danger btn-sm";
const bodyTextClass = "text-body";
const incorrectTextClass = "text-danger";
const correctTextClass = "text-success";
const secondaryTextClass = "text-secondary";
const primaryTextClass = "text-primary";
const waitTime = 1000;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function spellWord(word, wordId) {  
  var wordlistElement = document.getElementById(wordlistDiv);
  var studentAnswerElement = document.getElementById(studentAnswerDiv);
  var wordDisplayElement = document.getElementById(wordDisplayDiv);
  var studentAnswerInputDivElement = document.getElementById(studentAnswerInputDiv);
  var studentAnswerInputElement = document.getElementById(studentAnswerInputId);
  var hiddenWordElement = document.getElementById(hiddenWordId);
  var wordTextElement = document.getElementById(wordTextId);
  var answerWordElement = document.getElementById(wordId + answerSuffix);

  hiddenWordElement.value = wordId;
  studentAnswerInputElement.value = answerWordElement.value;

  wordlistElement.style.display = "none";
  studentAnswerElement.style.display = "block";
  wordDisplayElement.style.display = "block";
  studentAnswerInputDivElement.style.display = "none";
  wordTextElement.innerHTML = word;

  await delay(waitTime);

  wordDisplayElement.style.display = "none";
  studentAnswerInputDivElement.style.display = "block";
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
  answerWordElement.dispatchEvent(event);

  // Hide the student Answer form
  studentAnswerElement.style.display = "none"
  wordlistElement.style.display = "block"
}
function setButtonColourOnEntry() {
  var wordcountElement = document.getElementById("line_items");
  var wordcount = parseInt(wordcountElement.value);

  for (var i = 0; i < wordcount; i++) {
    var wordPrefix = 'word' + (i + 1).toString().padStart(2, '0')
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
    buttonElement.className = emptyButtonClass
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
    var newSpan = document.createElement('span')
    newSpan.innerHTML = defaultValue
    newSpan.className = primaryTextClass
    newSpan.draggable = true
    sourceParentElement.appendChild(newSpan)
  }
}

function toggleButtonClass(element) {
  if (element.className == correctButtonClass) {
    element.className  = emptyButtonClass;
  } else {
    element.className = correctButtonClass;
  }
}

function toggleTextClass(element, partnerId) {
  var partnerElement = document.getElementById(partnerId);
  if (element.className == correctTextClass) {
    element.className  = secondaryTextClass;
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
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
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
}

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

function modifyWord(actionElementId, currentElement) {
  const CAPITALISE = 'CAPITALISE';
  const UNCAPITALISE = 'UNCAPITALISE';
  const ADD_FULLSTOP = 'ADD_FULLSTOP';
  const REMOVE_FULLSTOP = 'REMOVE_FULLSTOP';

  actionElement = document.getElementById(actionElementId);

  if (actionElement.value == CAPITALISE) {
    currentElement.innerHTML = capitalizeFirstLetter(currentElement.innerHTML);
  } else if (actionElement.value == UNCAPITALISE) {
    currentElement.innerHTML = uncapitalizeFirstLetter(currentElement.innerHTML);
  } else if (actionElement.value == ADD_FULLSTOP) {
    currentElement.innerHTML = addFullstop(currentElement.innerHTML);
  } else if (actionElement.value == REMOVE_FULLSTOP) {
    currentElement.innerHTML = removeFullstop(currentElement.innerHTML);
  }
}