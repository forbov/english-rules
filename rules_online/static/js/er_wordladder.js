/******************************************************************************
 * File: ladder.js
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * An implementation of the word ladders game using JavaScript.  In the word
 * ladders game, two English words of the same length are given, and the goal
 * is to find a chain of words starting with the first word and ending with the
 * second word such that each intermediate word differs by exactly one letter
 * from the word before it.  For example,
 * 
 *                    code -> lode -> love -> live
 *
 * is a word ladder from "code" to "live."
 *
 * This file finds word ladders between different words by running a breadth-
 * first search from the source word to the destination word.
 */

/**
 * A utility class representing a word ladder.  Internally, the ladder is
 * represented as a linked list, which allows for faster cloning.
 */
function WordLadder(word) {
  /* This is a linked list; initially the prev pointer is null. */
  this.prev = null;

  /* The word stored here is given by the input word. */
  this.word = word;
}

/**
* Returns the last word in the word ladder.
*/
WordLadder.prototype.lastWord = function() {
  return this.word;
}

/**
* Creates and returns a new word ladder formed by adding a new word onto the
* end of this ladder.
*/
WordLadder.prototype.extendLadder = function(word) {
  /* Construct a new linked list cell and chain it onto the end. */
  var result = new WordLadder(word);
  result.prev = this;
  return result;
}

/**
* Converts a word ladder into a standard array.
*/
WordLadder.prototype.toArray = function() {
  /* Begin with the empty array. */
  var result = [];

  /* Walk back to the start of the linked list, appending each word to the
   * result array.
   */
  for (var curr = this; curr !== null; curr = curr.prev)
      result.push(curr.word);

  /* Reverse and return the array. */
  result.reverse();
  return result;    
}

/**
* Function: findSuccessors(word, words);
* Usage: successors = findSuccessors("cat", words);
* ----------------------------------------------------------------------------
* Given a word, returns all words that differ from that word by just one
* letter.
*/
function findSuccessors(word, words) {
  /* For each letter, try replacing that letter with something adjacent to
   * it and add it to the result list if this change yields a word.
   */
  var result = [];
  var msg = "";

  for (var i = 0; i < word.length; ++i) {
      for (var ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ++ch) {
          /* Build the new word. */
          var candidate = word.substring(0, i) + String.fromCharCode(ch) + word.substring(i + 1);

          /* See if it's a word. */
          if (words[candidate] !== undefined)
              result.push(candidate);
      }
  }
  return result;
}

/**
* Function: findWordLadder(startWord, endWord, words);
* Usage: ladder = findWordLadder("kitty", "puppy", wordList);
* ----------------------------------------------------------------------------
* Finds a word ladder from startWord to endWord using the words specified as
* keys in the words object.  It is assumed that the words have the same
* length and are both legal words.  If a ladder is found, it is returned as an
* array.  If not, undefined is returned.
* 
* Internally, this function works by running a breadth-first search of the 
* word graph.  The shortest path to the destination word is thus found.
*/
function findWordLadder(startWord, endWord, words) {
  /* Maintain a work list of partial ladders, seeded with the start word. */
  var workList = new Queue();
  workList.enqueue(new WordLadder(startWord));

  /* Also maintain a list of words that we have already processed; initially
   * this is empty.
   */
  var usedWords = {};

  /* While the worklist isn't empty, process elements from it. */
  while (workList.length() !== 0) {
      /* Obtain the current ladder. */
      var ladder = workList.dequeue();

      /* Look at the last word in the ladder.  If we've already seen it, skip
       * this word.
       */
      if (usedWords[ladder.lastWord()] !== undefined) continue;

      /* Otherwise, add that to the used word list. */
      usedWords[ladder.lastWord()] = null;

      /* If the last word is the destination word, hand back this word
       * ladder.
       */
      if (ladder.lastWord() == endWord)
          return ladder.toArray();

      /* Now, find all possible successor words for this word, and for each
       * of them extend the word ladder.
       */
      var successors = findSuccessors(ladder.lastWord(), words);

      /* For each successor, chain it onto the current word ladder and put
       * it back into the queue.
       */
      for (var i = 0; i < successors.length; ++i)
          workList.enqueue(ladder.extendLadder(successors[i]));
  }
}

function levenshtein(s, t) {
  if (s === t) {
      return 0;
  }
  var n = s.length, m = t.length;
  if (n === 0 || m === 0) {
      return n + m;
  }
  var x = 0, y, a, b, c, d, g, h;
  var p = new Uint16Array(n);
  var u = new Uint32Array(n);
  for (y = 0; y < n;) {
      u[y] = s.charCodeAt(y);
      p[y] = ++y;
  }

  for (; (x + 3) < m; x += 4) {
      var e1 = t.charCodeAt(x);
      var e2 = t.charCodeAt(x + 1);
      var e3 = t.charCodeAt(x + 2);
      var e4 = t.charCodeAt(x + 3);
      c = x;
      b = x + 1;
      d = x + 2;
      g = x + 3;
      h = x + 4;
      for (y = 0; y < n; y++) {
          a = p[y];
          if (a < c || b < c) {
              c = (a > b ? b + 1 : a + 1);
          }
          else {
              if (e1 !== u[y]) {
                  c++;
              }
          }

          if (c < b || d < b) {
              b = (c > d ? d + 1 : c + 1);
          }
          else {
              if (e2 !== u[y]) {
                  b++;
              }
          }

          if (b < d || g < d) {
              d = (b > g ? g + 1 : b + 1);
          }
          else {
              if (e3 !== u[y]) {
                  d++;
              }
          }

          if (d < g || h < g) {
              g = (d > h ? h + 1 : d + 1);
          }
          else {
              if (e4 !== u[y]) {
                  g++;
              }
          }
          p[y] = h = g;
          g = d;
          d = b;
          b = c;
          c = a;
      }
  }

  for (; x < m;) {
      var e = t.charCodeAt(x);
      c = x;
      d = ++x;
      for (y = 0; y < n; y++) {
          a = p[y];
          if (a < c || d < c) {
              d = (a > d ? d + 1 : a + 1);
          }
          else {
              if (e !== u[y]) {
                  d = c + 1;
              }
              else {
                  d = c;
              }
          }
          p[y] = d;
          c = a;
      }
      h = d;
  }
  return h;
}

function validateEntry(element, previousElementId, wordList) {
  wordEntered = element.value;
  previousElement = document.getElementById(previousElementId);
  previousWord = previousElement.value;

  if (levenshtein(wordEntered, previousWord) != 1) {
    window.alert('Invalid word ladder entry. The word must differ by exactly one letter.');
    element.value = ''
    element.focus();
    return;
  }
  if (!wordList.includes(wordEntered.toUpperCase())) {
    window.alert('Invalid word. Please enter a valid English word.');
    element.value = ''
    element.focus();
  }
}