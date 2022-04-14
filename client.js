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

  let activeKeys = [];

  $("body").keydown(function(e) {
    // console.log(e.code);
    switch(e.code) {
      case "KeyA":
        // C
        break;
      case "KeyW":
        // C# / Db
        break;
      case "KeyS":
        // D
        break;
      case "KeyE":
        // D# / Eb
        break;
      case "KeyD":
        // E
        break;
      case "KeyF":
        // F
        break;
      case "KeyT":
        // F# / Gb
        break;
      case "KeyG":
        // G
        break;
      case "KeyY":
        // G# / Ab
        break;
      case "KeyH":
        // A
        break;
      case "KeyU":
        // A# / Bb
        break;
      case "KeyJ":
        // B
        break;
      case "KeyK":
        // C + 12
        break;
      case "KeyO":
        // C# / Db + 12
        break;
      case "KeyL":
        // D + 12
        break;
      case "KeyP":
        // D# / Eb + 12
        break;
      case "Semicolon":
        // E + 12
        break;
      case "Quote":
        // F + 12
        break;
      case "Digit1":
        // Switch to octave 1
        break;
      case "Digit2":
        // Switch to octave 2
        break;
      case "Digit3":
        // Switch to octave 3
        break;
      case "Digit4":
        // Switch to octave 4
        break;
      case "Digit5":
        // Switch to octave 5
        break;
    }
    if(!activeKeys.includes(e.code)) {
      console.log(e.code);
      activeKeys.push(e.code);
      console.log(activeKeys);
    }
  });

  $("body").keyup(function(e) {
    if(activeKeys.includes(e.code)) {
      console.log(e.code);
      activeKeys.splice(activeKeys.indexOf(e.code), 1);
      console.log(activeKeys);
    }
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
    if(tableArr === "none") {
      tableArr = $(this).parent().parent().siblings().text();
      switch (tableArr) {
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
    }
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
        // Find out what notes are triggering on this tick
        for(let i = 0; i < eval(tableArr).length; i++) {
          let nsRow = parseInt(eval(tableArr)[i].attr("class").split(/\s+/)[0].split('r')[1]);
          if(eval(tableArr)[i].hasClass("c" + ctr) &&
            // https://www.codegrepper.com/code-examples/javascript/js+2d+array+includes
            !seqFound.some(row => JSON.stringify(row) === JSON.stringify([nsRow, ctr]))
          ) {
            // For each triggered note, search ahead to see how long it should be sustained
            let noteLen = 0.125;
            // Proxy note object
            let scanNote = eval(tableArr)[i].clone()
              .removeClass("c" + ctr).addClass("c" + (ctr + 1))
              .removeClass("o1").addClass("o1");
            for(let j = i; j < eval(tableArr).length; j++) {
              // See if "one tick ahead" exists
              if(eval(tableArr)[j].attr("class") === scanNote.attr("class")) {
                // Increment proxy note and reset counter to continue looking ahead
                let prevNum = parseInt(scanNote.attr("class").split(/\s+/)[1].split('c')[1]);
                seqFound.push([parseInt(scanNote.attr("class").split(/\s+/)[0].split('r')[1]), prevNum]);
                scanNote.removeClass("c" + prevNum).addClass("c" + (prevNum + 1))
                  .removeClass("o1").addClass("o1");
                noteLen += 0.125;
              }
            }
            console.log(noteLen);
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
      switch (tableArr) {
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
      // Remember to implement proper multi-octave support
      if($(this).hasClass("o1")) {
        $(this).removeClass("o1");
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
      switch (tableArr) {
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
        // Remember to implement proper multi-octave support
        if($(this).hasClass("o1")) {
          $(this).removeClass("o1");
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