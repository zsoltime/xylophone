'use strict';

function Game() {
  const dom = {};
  let timer;
  let sequence;
  let state;

  function init() {
    cacheDom();
    bindEvents();
    timer = Timer();
    sequence = Sequence(dom.sounds);
  }
  function cacheDom() {
    dom.game = document.getElementById('game');
    dom.keys = game.getElementsByTagName('div');
    dom.sounds = {
      c: document.getElementById('c'),
      d: document.getElementById('d'),
      e: document.getElementById('e'),
      f: document.getElementById('f'),
      g: document.getElementById('g'),
      a: document.getElementById('a'),
      b: document.getElementById('b'),
      cc: document.getElementById('cc')
    }
    dom.record = document.getElementById('record');
    dom.play = document.getElementById('play');
    dom.stop = document.getElementById('stop');
  }
  function bindEvents() {
    dom.game.addEventListener('click', playNote);
    dom.record.addEventListener('click', record);
    dom.play.addEventListener('click', play);
    dom.stop.addEventListener('click', stop);
  }
  function playNote() {
    if (event.target === dom.game || state === 'playing') {
      return;
    }
    let note = event.target.dataset.key;
    if (state === 'recording') {
      sequence.record(note, timer.current());
    }
    dom.sounds[note].play();
  }
  function record() {
    state = 'recording';
    timer.start();
  }
  function play() {
    state = 'playing';
    sequence.play();
  }
  function stop() {
    state = undefined;
    sequence.stop();
  }
  return {
    init
  }
}

function Timer() {
  let startedAt;
  let timeouts = [];

  function start() {
    startedAt = new Date();
  }
  function current() {
    return new Date() - startedAt;
  }
  function wait(time) {
    return new Promise((resolve, reject) => {
      timeouts.push(setTimeout(resolve, time));
    });
  }
  function clear() {
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }
  return {
    start,
    current,
    wait,
    clearAll: clear
  }
}

function Sequence(notes) {
  let timer = Timer();
  let timeouts = [];
  let sequence = [
    // {note: 'd', time: 500},
    // {note: 'b', time: 1000},
    // {note: 'a', time: 1500},
    // {note: 'g', time: 2000},
    // {note: 'd', time: 2500},
    // {note: 'd', time: 4500},
    // {note: 'd', time: 4700},
    // {note: 'd', time: 5000},
    // {note: 'b', time: 5500},
    // {note: 'a', time: 6000},
    // {note: 'g', time: 6500},
    // {note: 'e', time: 7000},
    // {note: 'e', time: 9000},
    // {note: 'cc', time: 9500},
    // {note: 'b', time: 10000},
    // {note: 'a', time: 10500},
    // {note: 'g', time: 11000}
  ];
  function play() {
    for (let i = 0; i < sequence.length; i++) {
      console.log(sequence[i])
      // console.log(notes[sequence[i].note])
      timer.wait(sequence[i].time)
      .then(_ => notes[sequence[i].note].pause())
      .then(_ => notes[sequence[i].note].currentTime = 0)
      .then(_ => notes[sequence[i].note].play())
    }
  }
  function record(note, time) {
    sequence.push({note: note, time: time});
  }
  function stop() {
    timer.clearAll();
  }
  function clear() {
    sequence = [];
  }
  return {
    play,
    record,
    stop,
    clear
  }
}

document.addEventListener('DOMContentLoaded', function(e) {
  const game = Game();
  game.init();
});
