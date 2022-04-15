$(document).ready(function() {

  let saw = new Wad({source: "sawtooth", pitch: "C2", env: {hold: -1}});
  let square = new Wad({source: "square", pitch: "G3", env: {hold: -1}});
  let sine = new Wad({source: "sine", pitch: "Db3", env: {hold: -1}});
  let triangle = new Wad({source: "square", pitch: "D#3", env: {hold: -1}});
  let playStatus = "none";

  // Modal variables
  let drag = false;
  let octave = 1;

  $("body").mouseup(function() { drag = false; });

  $(".inst").click(function() {
    if(playStatus !== this.name) {
      eval(this.name).play();
      $("#vol").val(eval(this.name).volume);
      playStatus = this.name;
    }
    else {
      eval(this.name).stop();
      playStatus = "none";
    }
  });

  $("#vol").on("input", function() {
    eval(playStatus).setVolume($(this).val());
  });

  let noteSeq = [];
  let sawSeq = [];
  let sqSeq = [];
  let sinSeq = [];
  let triSeq = [];

  // Script for playing a sequence
  function playSequence(tableArr) {
    // Tempo = 60 BPM for now (1/32nd note = 0.125s)
    // Process the 32 "ticks" per measure
    let instrument = "";
    if(tableArr === "none") {
      tableArr = $(this).parent().parent().siblings().text();
      switch(tableArr) {
        case "Saw Sequencing":
          tableArr = "sawSeq";
          instrument = "saw";
          break;
        case "Square Sequencing":
          tableArr = "sqSeq";
          instrument = "square";
          break;
        case "Sine Sequencing":
          tableArr = "sinSeq";
          instrument = "sine";
          break;
        case "Triangle Sequencing":
          tableArr = "triSeq";
          instrument = "triangle";
          break;
      }
    }
    else if(tableArr === "sawSeq") { instrument = "saw"; }
    else if(tableArr === "sqSeq") { instrument = "square"; }
    else if(tableArr === "sinSeq") { instrument = "sine"; }
    else if(tableArr === "triSeq") { instrument = "triangle"; }
    let ctr = 1;
    // Sort sequence input data
    eval(tableArr).sort(function(a, b) {
      colA = parseInt(a.attr("class").split(/\s+/)[1].split('c')[1]);
      colB = parseInt(b.attr("class").split(/\s+/)[1].split('c')[1]);
      if(colA === colB) { return 0; }
      else if(colA > colB) { return 1; }
      else { return -1; }
    });
    seqFound = [];
    function sequentialize() {
      setTimeout(() => {
        let noteLen = 0;
        let notePitch = "A4";
        // Find out what notes are triggering on this tick
        for(let i = 0; i < eval(tableArr).length; i++) {
          let nsRow = parseInt(eval(tableArr)[i].attr("class").split(/\s+/)[0].split('r')[1]);
          let nsOct = eval(tableArr)[i].attr("class").split(/\s+/)[2].split('o')[1];
          switch(nsRow) {
            case 12:
              notePitch = "C" + nsOct;
              break;
            case 11:
              notePitch = "C#" + nsOct;
              break;
            case 10:
              notePitch = "D" + nsOct;
              break;
            case 9:
              notePitch = "D#" + nsOct;
            case 8:
              notePitch = "E" + nsOct;
              break;
            case 7:
              notePitch = "F" + nsOct;
              break;
            case 6:
              notePitch = "F#" + nsOct;
              break;
            case 5:
              notePitch = "G" + nsOct;
              break;
            case 4:
              notePitch = "G#" + nsOct;
              break;
            case 3:
              notePitch = "A" + nsOct;
              break;
            case 2:
              notePitch = "A#" + nsOct;
              break;
            case 1:
              notePitch = "B" + nsOct;
              break;
          }
          if(eval(tableArr)[i].hasClass("c" + ctr) &&
            // https://www.codegrepper.com/code-examples/javascript/js+2d+array+includes
            !seqFound.some(row => JSON.stringify(row) === JSON.stringify([nsRow, ctr]))
          ) {
            // For each triggered note, search ahead to see how long it should be sustained
            noteLen = 0.125;
            // Proxy note object
            let scanNote = eval(tableArr)[i].clone()
              .removeClass("c" + ctr).addClass("c" + (ctr + 1))
              .removeClass("o" + nsOct).addClass("o" + nsOct);
            for(let j = i; j < eval(tableArr).length; j++) {
              // See if "one tick ahead" exists
              if(eval(tableArr)[j].attr("class") === scanNote.attr("class")) {
                // Increment proxy note and reset counter to continue looking ahead
                let prevNum = parseInt(scanNote.attr("class").split(/\s+/)[1].split('c')[1]);
                seqFound.push([parseInt(scanNote.attr("class").split(/\s+/)[0].split('r')[1]), prevNum]);
                scanNote.removeClass("c" + prevNum).addClass("c" + (prevNum + 1))
                  .removeClass("o" + nsOct).addClass("o" + nsOct);
                noteLen += 0.125;
              }
            }
            console.log(noteLen);
            eval(instrument).play({
              pitch: notePitch,
              env: {
                attack: 0,
                decay: 0,
                sustain: 0.2,
                hold: noteLen,
                release: 0
              }
            });
          }
        }
        console.log(ctr);
        ctr++;
        if(ctr < 33) { sequentialize(); }
      }, 125);
    }
    sequentialize();
  }

  function modListen() {

    $(".seqTable>div").off();
    $("button[name='seqPlayTog']").off();

    $(".seqTable>div").mousedown(function() {
      let tableArr = $(this).parents().eq(2).siblings().text();
      switch(tableArr) {
        case "Saw Sequencing":
          tableArr = "sawSeq";
          break;
        case "Square Sequencing":
          tableArr = "sqSeq";
          break;
        case "Sine Sequencing":
          tableArr = "sinSeq";
          break;
        case "Triangle Sequencing":
          tableArr = "triSeq";
          break;
      }
      drag = true;
      let classArr = $(this).attr("class").split(/\s+/);
      if(classArr.length === 3) {
        $(this).removeClass(classArr[2]);
        eval(tableArr).splice($.inArray($(this), eval(tableArr)), 1);
        $(this).css("backgroundColor", "white");
      }
      else {
        // Multi-color descision tree thing here
        // But for now...
        $(this).addClass($(this).parent().attr("class").split(/\s+/)[2]);
        $(this).css("backgroundColor", "tomato");
        eval(tableArr).push($(this));
      }
      // if($(this).hasClass("r12")) {

      // }
    });

    $(".seqTable>div").mouseenter(function() {
      let tableArr = $(this).parents().eq(2).siblings().text();
      switch(tableArr) {
        case "Saw Sequencing":
          tableArr = "sawSeq";
          break;
        case "Square Sequencing":
          tableArr = "sqSeq";
          break;
        case "Sine Sequencing":
          tableArr = "sinSeq";
          break;
        case "Triangle Sequencing":
          tableArr = "triSeq";
          break;
      }
      if(drag) {
        let classArr = $(this).attr("class").split(/\s+/);
        if(classArr.length === 3) {
          $(this).removeClass(classArr[2]);
          eval(tableArr).splice($.inArray($(this), eval(tableArr)), 1);
          $(this).css("backgroundColor", "white");
        }
        else {
          // Multi-color descision tree thing here
          // But for now...
          $(this).addClass($(this).parent().attr("class").split(/\s+/)[2]);
          $(this).css("backgroundColor", "tomato");
          eval(tableArr).push($(this));
        }
      }
    });

    $("input[name='octave']").change(function() {
      octave = $(this).val();
      $(".seqTable").each(function() {
        if($(this).hasClass('o' + octave)) { $(this).show(1); }
        else { $(this).hide(1); }
      });
    });

    // Currently unused -- need to incorporate
    let itr = new Wad.SoundIterator({
      files: [saw, square, sine, triangle],
      random: false,
      randomPlaysBeforeRepeat: 0
    });

    $("button[name='seqPlayTog']").click(function() { playSequence.call(this, "none"); });
  }

  $("#playAll").click(function() {
    playSequence.call(this, "sawSeq");
    playSequence.call(this, "sqSeq");
    playSequence.call(this, "sinSeq");
    playSequence.call(this, "triSeq");
  });

  // Modal declarations
  new jBox("Modal", {
    attach: "#sawMod",
    title: "Saw Sequencing",
    width: "100%",
    height: "100%",
    content: $("#seqContainer").clone(),
    onCreated: function() { modListen(); },
    onOpen: function() {
      $(".seqTable").hide(1);
      $(".o1").show(1);
    }
  });

  new jBox("Modal", {
    attach: "#sqMod",
    title: "Square Sequencing",
    width: "100%",
    height: "100%",
    content: $("#seqContainer").clone(),
    onCreated: function() { modListen(); },
    onOpen: function() {
      $(".seqTable").hide(1);
      $(".o1").show(1);
    }
  });

  new jBox("Modal", {
    attach: "#sinMod",
    title: "Sine Sequencing",
    width: "100%",
    height: "100%",
    content: $("#seqContainer").clone(),
    onCreated: function() { modListen(); },
    onOpen: function() {
      $(".seqTable").hide(1);
      $(".o1").show(1);
    }
  });

  new jBox("Modal", {
    attach: "#triMod",
    title: "Triangle Sequencing",
    width: "100%",
    height: "100%",
    content: $("#seqContainer").clone(),
    onCreated: function() { modListen(); },
    onOpen: function() {
      $(".seqTable").hide(1);
      $(".o1").show(1);
    }
  });
});