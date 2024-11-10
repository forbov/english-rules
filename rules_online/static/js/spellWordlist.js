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