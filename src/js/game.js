'use strict';

const notes = document.getElementsByTagName('audio');
const keys = document.getElementById('game').getElementsByTagName('div');
let recording = false;

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', _ => notes[i].play());
}

// record key hit
// record timing
if (recording) {

}

function Sequence() {
  let sequence = [
    {note: 1, time: 500},
    {note: 6, time: 1000},
    {note: 5, time: 1500},
    {note: 4, time: 2000},
    {note: 1, time: 2500},
    {note: 1, time: 4500},
    {note: 1, time: 4700},
    {note: 1, time: 5000},
    {note: 6, time: 5500},
    {note: 5, time: 6000},
    {note: 4, time: 6500},
    {note: 2, time: 7000}
  ];
  function play() {
    for (let i = 0; i < sequence.length; i++) {
      wait(sequence[i].time)
      // .then(wait(1000))
      .then(_ => notes[sequence[i].note].pause())
      .then(_ => notes[sequence[i].note].currentTime = 0)
      .then(_ => notes[sequence[i].note].play())
    }
  }
  function record() {}
  function stop() {}
  function wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }
  return {
    play
  }
}

function playSequence() {}
function recordSequence() {
  // check time between actions
  // when hit a key, record key and time elapsed

}
