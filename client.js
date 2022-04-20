$(document).ready(function() {

  let saw = new Wad({source: "sawtooth", pitch: "C2", env: {hold: -1}});
  let square = new Wad({source: "square", pitch: "G3", env: {hold: -1}});
  let sine = new Wad({source: "sine", pitch: "Db3", env: {hold: -1}});
  let triangle = new Wad({source: "square", pitch: "D#3", env: {hold: -1}});
  let playStatus = "none";

  // Modal variables
  let drag = false;
  let octave = 1;
  let tempoTick = 0.0625 // Seconds per 32nd note
  let selectedIns = "none";

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

  $("input[name='insSelect']").change(function() {
    selectedIns = $(this).val();
    $(".modOpen").prop("disabled", false);
    switch(selectedIns) {
      case "saw":
        $("#sawMod").prop("disabled", true);
        break;
      case "square":
        $("#sqMod").prop("disabled", true);
        break;
      case "sine":
        $("#sinMod").prop("disabled", true);
        break;
      case "triangle":
        $("#triMod").prop("disabled", true);
        break;
    }
  });

  let activeKeys = [];
  let activeOct = 3;

  $("body").keydown(function(e) {
    // console.log(e.code);
    if(!activeKeys.includes(e.code)) {
      console.log(e.code);
      if(selectedIns !== "none") {
        switch(e.code) {
          case "KeyA":
            // C
            eval(selectedIns).play({
              pitch: ("C" + activeOct),
              label: ("C" + activeOct)
            });
            break;
          case "KeyW":
            // C# / Db
            eval(selectedIns).play({
              pitch: ("C#" + activeOct),
              label: ("C#" + activeOct)
            });
            break;
          case "KeyS":
            // D
            eval(selectedIns).play({
              pitch: ("D" + activeOct),
              label: ("D" + activeOct)
            });
            break;
          case "KeyE":
            // D# / Eb
            eval(selectedIns).play({
              pitch: ("D#" + activeOct),
              label: ("D#" + activeOct)
            });
            break;
          case "KeyD":
            // E
            eval(selectedIns).play({
              pitch: ("E" + activeOct),
              label: ("E" + activeOct)
            });
            break;
          case "KeyF":
            // F
            eval(selectedIns).play({
              pitch: ("F" + activeOct),
              label: ("F" + activeOct)
            });
            break;
          case "KeyT":
            // F# / Gb
            eval(selectedIns).play({
              pitch: ("F#" + activeOct),
              label: ("F#" + activeOct)
            });
            break;
          case "KeyG":
            // G
            eval(selectedIns).play({
              pitch: ("G" + activeOct),
              label: ("G" + activeOct)
            });
            break;
          case "KeyY":
            // G# / Ab
            eval(selectedIns).play({
              pitch: ("G#" + activeOct),
              label: ("G#" + activeOct)
            });
            break;
          case "KeyH":
            // A
            eval(selectedIns).play({
              pitch: ("A" + activeOct),
              label: ("A" + activeOct)
            });
            break;
          case "KeyU":
            // A# / Bb
            eval(selectedIns).play({
              pitch: ("A#" + activeOct),
              label: ("A#" + activeOct)
            });
            break;
          case "KeyJ":
            // B
            eval(selectedIns).play({
              pitch: ("B" + activeOct),
              label: ("B" + activeOct)
            });
            break;
          case "KeyK":
            // C + 12
            eval(selectedIns).play({
              pitch: ("C" + (activeOct + 1)),
              label: ("C" + (activeOct + 1))
            });
            break;
          case "KeyO":
            // C# / Db + 12
            eval(selectedIns).play({
              pitch: ("C#" + (activeOct + 1)),
              label: ("C#" + (activeOct + 1))
            });
            break;
          case "KeyL":
            // D + 12
            eval(selectedIns).play({
              pitch: ("D" + (activeOct + 1)),
              label: ("D" + (activeOct + 1))
            });
            break;
          case "KeyP":
            // D# / Eb + 12
            eval(selectedIns).play({
              pitch: ("D#" + (activeOct + 1)),
              label: ("D#" + (activeOct + 1))
            });
            break;
          case "Semicolon":
            // E + 12
            eval(selectedIns).play({
              pitch: ("E" + (activeOct + 1)),
              label: ("E" + (activeOct + 1))
            });
            break;
          case "Quote":
            // F + 12
            eval(selectedIns).play({
              pitch: ("F" + (activeOct + 1)),
              label: ("F" + (activeOct + 1))
            });
            break;
          case "Digit1":
            // Switch to octave 1
            activeOct = 1;
            break;
          case "Digit2":
            // Switch to octave 2
            activeOct = 2;
            break;
          case "Digit3":
            // Switch to octave 3
            activeOct = 3;
            break;
          case "Digit4":
            // Switch to octave 4
            activeOct = 4;
            break;
          case "Digit5":
            // Switch to octave 5
            activeOct = 5;
            break;
        }
      }
      activeKeys.push(e.code);
      console.log(activeKeys);
    }
  });

  $("body").keyup(function(e) {
    if(activeKeys.includes(e.code)) {
      console.log(e.code);
      if(selectedIns !== "none") {
        switch(e.code) {
          case "KeyA":
            // C
            eval(selectedIns).stop("C" + activeOct);
            break;
          case "KeyW":
            // C# / Db
            eval(selectedIns).stop("C#" + activeOct);
            break;
          case "KeyS":
            // D
            eval(selectedIns).stop("D" + activeOct);
            break;
          case "KeyE":
            // D# / Eb
            eval(selectedIns).stop("D#" + activeOct);
            break;
          case "KeyD":
            // E
            eval(selectedIns).stop("E" + activeOct);
            break;
          case "KeyF":
            // F
            eval(selectedIns).stop("F" + activeOct);
            break;
          case "KeyT":
            // F# / Gb
            eval(selectedIns).stop("F#" + activeOct);
            break;
          case "KeyG":
            // G
            eval(selectedIns).stop("G" + activeOct);
            break;
          case "KeyY":
            // G# / Ab
            eval(selectedIns).stop("G#" + activeOct);
            break;
          case "KeyH":
            // A
            eval(selectedIns).stop("A" + activeOct);
            break;
          case "KeyU":
            // A# / Bb
            eval(selectedIns).stop("A#" + activeOct);
            break;
          case "KeyJ":
            // B
            eval(selectedIns).stop("B" + activeOct);
            break;
          case "KeyK":
            // C + 12
            eval(selectedIns).stop("C" + (activeOct + 1));
            break;
          case "KeyO":
            // C# / Db + 12
            eval(selectedIns).stop("C#" + (activeOct + 1));
            break;
          case "KeyL":
            // D + 12
            eval(selectedIns).stop("D" + (activeOct + 1));
            break;
          case "KeyP":
            // D# / Eb + 12
            eval(selectedIns).stop("D#" + (activeOct + 1));
            break;
          case "Semicolon":
            // E + 12
            eval(selectedIns).stop("E" + (activeOct + 1));
            break;
          case "Quote":
            // F + 12
            eval(selectedIns).stop("F" + (activeOct + 1));
            break;
        }
      }
      activeKeys.splice(activeKeys.indexOf(e.code), 1);
      console.log(activeKeys);
    }
  });

  $("#tempo").change(function() {
    // Tempo is calculated by 60 seconds per min over the BPM value to get how many seconds a quarter note takes
    tempoTick = 60 / $(this).val();
    // This is then divided by 8 to get the time of a 32nd note -- the fundamental time unit for this app
    tempoTick /= 8;
  });

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
            noteLen = tempoTick;
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
                noteLen += tempoTick;
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
      }, (tempoTick * 1000));
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

    $("button[name='clearSeq']").click(function() {
      switch($(this).parent().parent().siblings().text()) {
        case "Saw Sequencing":
          sawSeq = [];
          break;
        case "Square Sequencing":
          sqSeq = [];
          break;
        case "Sine Sequencing":
          sinSeq = [];
          break;
        case "Triangle Sequencing":
          triSeq = [];
          break;
      }
      $(this).siblings().each(function() {
        $(this).children().css("backgroundColor", "white");
      });
    });
  }

  $("#playAll").click(function() {
    if(selectedIns !== "saw") { playSequence.call(this, "sawSeq"); }
    if(selectedIns !== "square") { playSequence.call(this, "sqSeq"); }
    if(selectedIns !== "sine") { playSequence.call(this, "sinSeq"); }
    if(selectedIns !== "triangle") { playSequence.call(this, "triSeq"); }
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