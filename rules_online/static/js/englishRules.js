const wordlistDiv = "wordlist";
const studentEntryDiv = "student_entry";
const wordDisplayDiv = "word_display";
const studentEntryInputDiv = "student_entry_input_div";
const studentEntryInputId = "student_entry_input_id";
const hiddenWordId = "hidden_word_id";
const wordTextId = "word_text";
const buttonSuffix = "_button";
const enteredSuffix = "_entered";
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
  var studentEntryElement = document.getElementById(studentEntryDiv);
  var wordDisplayElement = document.getElementById(wordDisplayDiv);
  var studentEntryInputDivElement = document.getElementById(studentEntryInputDiv);
  var studentEntryInputElement = document.getElementById(studentEntryInputId);
  var hiddenWordElement = document.getElementById(hiddenWordId);
  var wordTextElement = document.getElementById(wordTextId);
  var enteredWordElement = document.getElementById(wordId + enteredSuffix);

  hiddenWordElement.value = wordId;
  studentEntryInputElement.value = enteredWordElement.value;

  wordlistElement.style.display = "none";
  studentEntryElement.style.display = "block";
  wordDisplayElement.style.display = "block";
  studentEntryInputDivElement.style.display = "none";
  wordTextElement.innerHTML = word;

  await delay(waitTime);

  wordDisplayElement.style.display = "none";
  studentEntryInputDivElement.style.display = "block";
}

function recordStudentEntry() {
  var wordlistElement = document.getElementById(wordlistDiv);
  var studentEntryElement = document.getElementById(studentEntryDiv);
  var currentWordId = document.getElementById(hiddenWordId).value;

  var wordMasterValue = document.getElementById(currentWordId + masterSuffix).value;
  var studentEntryValue = document.getElementById(studentEntryInputId).value;
  var wordButtonElement = document.getElementById(currentWordId + buttonSuffix);
  var enteredWordElement = document.getElementById(currentWordId + enteredSuffix);

  enteredWordElement.value = studentEntryValue;

  if (studentEntryValue == "") {
    wordButtonElement.className = emptyButtonClass
  } else if (wordMasterValue == studentEntryValue) {
    wordButtonElement.className = correctButtonClass;
  } else {
    wordButtonElement.className = incorrectButtonClass;
  }

  // Hide the student entry form
  studentEntryElement.style.display = "none"
  wordlistElement.style.display = "block"
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