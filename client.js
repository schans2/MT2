$(document).ready(function() {

  // Instrument declarations
  let saw = new Wad({source: "sawtooth", pitch: "C2", env: {hold: -1, release: 0.01}});
  let square = new Wad({source: "square", pitch: "G3", env: {hold: -1, release: 0.01}});
  let sine = new Wad({source: "sine", pitch: "Db3", env: {hold: -1, release: 0.01}});
  let triangle = new Wad({source: "square", pitch: "D#3", env: {hold: -1, release: 0.01}});

  // Volume variables
  let mastVol = 0.5;
  let sawVol = 0.125;
  let sqVol = 0.125;
  let sinVol = 0.125;
  let triVol = 0.125;
  let volTotal = 200;

  // Volume control listener
  $("input[name='vol']").on("input", function() {
    mastVol = $("#mastVol").val();
    volTotal = (
      parseInt($("#sawVol").val()) + parseInt($("#sqVol").val()) +
      parseInt($("#sinVol").val()) + parseInt($("#triVol").val())
    );
    sawVol = ($("#sawVol").val() / volTotal) * mastVol;
    sqVol = ($("#sqVol").val() / volTotal) * mastVol;
    sinVol = ($("#sinVol").val() / volTotal) * mastVol;
    triVol = ($("#triVol").val() / volTotal) * mastVol;
    $("#mastVVal").val((mastVol * 100).toFixed(1));
    $("#sawVVal").val(((sawVol / mastVol) * 100).toFixed(1));
    $("#sqVVal").val(((sqVol / mastVol) * 100).toFixed(1));
    $("#sinVVal").val(((sinVol / mastVol) * 100).toFixed(1));
    $("#triVVal").val(((triVol / mastVol) * 100).toFixed(1));
  });

  // Keyboard input variables
  let selectedIns = "none";
  let selectedInsVol = "none";
  let activeKeys = [];
  let activeOct = 3;

  // Instrument selector handler
  $("input[name='insSelect']").change(function() {
    selectedIns = $(this).val();
    $(".modOpen").prop("disabled", false);
    switch(selectedIns) {
      case "saw":
        $("#sawMod").prop("disabled", true);
        selectedInsVol = "sinVol";
        break;
      case "square":
        $("#sqMod").prop("disabled", true);
        selectedInsVol = "sqVol";
        break;
      case "sine":
        $("#sinMod").prop("disabled", true);
        selectedInsVol = "sinVol";
        break;
      case "triangle":
        $("#triMod").prop("disabled", true);
        selectedInsVol = "triVol";
        break;
    }
  });

  // Instrument playing handler
  $("body").keydown(function(e) {
    if(!activeKeys.includes(e.code)) {
      console.log(e.code);
      if(selectedIns !== "none") {
        switch(e.code) {
          case "KeyA":
            // C
            eval(selectedIns).play({
              pitch: ("C" + activeOct),
              label: ("C" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(1)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(1)").css("textShadow", "0 0 15px");
            break;
          case "KeyW":
            // C# / Db
            eval(selectedIns).play({
              pitch: ("C#" + activeOct),
              label: ("C#" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(2)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(2)").css("textShadow", "0 0 15px");
            break;
          case "KeyS":
            // D
            eval(selectedIns).play({
              pitch: ("D" + activeOct),
              label: ("D" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(3)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(3)").css("textShadow", "0 0 15px");
            break;
          case "KeyE":
            // D# / Eb
            eval(selectedIns).play({
              pitch: ("D#" + activeOct),
              label: ("D#" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(4)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(4)").css("textShadow", "0 0 15px");
            break;
          case "KeyD":
            // E
            eval(selectedIns).play({
              pitch: ("E" + activeOct),
              label: ("E" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(5)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(5)").css("textShadow", "0 0 15px");
            break;
          case "KeyF":
            // F
            eval(selectedIns).play({
              pitch: ("F" + activeOct),
              label: ("F" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(6)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(6)").css("textShadow", "0 0 15px");
            break;
          case "KeyT":
            // F# / Gb
            eval(selectedIns).play({
              pitch: ("F#" + activeOct),
              label: ("F#" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(7)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(7)").css("textShadow", "0 0 15px");
            break;
          case "KeyG":
            // G
            eval(selectedIns).play({
              pitch: ("G" + activeOct),
              label: ("G" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(8)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(8)").css("textShadow", "0 0 15px");
            break;
          case "KeyY":
            // G# / Ab
            eval(selectedIns).play({
              pitch: ("G#" + activeOct),
              label: ("G#" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(9)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(9)").css("textShadow", "0 0 15px");
            break;
          case "KeyH":
            // A
            eval(selectedIns).play({
              pitch: ("A" + activeOct),
              label: ("A" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(10)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(10)").css("textShadow", "0 0 15px");
            break;
          case "KeyU":
            // A# / Bb
            eval(selectedIns).play({
              pitch: ("A#" + activeOct),
              label: ("A#" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(11)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(11)").css("textShadow", "0 0 15px");
            break;
          case "KeyJ":
            // B
            eval(selectedIns).play({
              pitch: ("B" + activeOct),
              label: ("B" + activeOct),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(12)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(12)").css("textShadow", "0 0 15px");
            break;
          case "KeyK":
            // C + 12
            eval(selectedIns).play({
              pitch: ("C" + (activeOct + 1)),
              label: ("C" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(13)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(13)").css("textShadow", "0 0 15px");
            break;
          case "KeyO":
            // C# / Db + 12
            eval(selectedIns).play({
              pitch: ("C#" + (activeOct + 1)),
              label: ("C#" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(14)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(14)").css("textShadow", "0 0 15px");
            break;
          case "KeyL":
            // D + 12
            eval(selectedIns).play({
              pitch: ("D" + (activeOct + 1)),
              label: ("D" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(15)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(15)").css("textShadow", "0 0 15px");
            break;
          case "KeyP":
            // D# / Eb + 12
            eval(selectedIns).play({
              pitch: ("D#" + (activeOct + 1)),
              label: ("D#" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(16)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(16)").css("textShadow", "0 0 15px");
            break;
          case "Semicolon":
            // E + 12
            eval(selectedIns).play({
              pitch: ("E" + (activeOct + 1)),
              label: ("E" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(17)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(17)").css("textShadow", "0 0 15px");
            break;
          case "Quote":
            // F + 12
            eval(selectedIns).play({
              pitch: ("F" + (activeOct + 1)),
              label: ("F" + (activeOct + 1)),
              volume: eval(selectedInsVol)
            });
            $("#noteCtrl>span:nth-child(18)").css("color", "mediumspringgreen");
            $("#noteCtrl>span:nth-child(18)").css("textShadow", "0 0 15px");
            break;
          case "Digit1":
            // Switch to octave 1
            activeOct = 1;
            $("#octCtrl>span").css("color", "#FAC560");
            $("#octCtrl>span").css("textShadow", "0 0 0");
            $("#octCtrl>span:nth-child(2)").css("color", "mediumspringgreen");
            $("#octCtrl>span:nth-child(2)").css("textShadow", "0 0 15px");
            break;
          case "Digit2":
            // Switch to octave 2
            activeOct = 2;
            $("#octCtrl>span").css("color", "#FAC560");
            $("#octCtrl>span").css("textShadow", "0 0 0");
            $("#octCtrl>span:nth-child(3)").css("color", "mediumspringgreen");
            $("#octCtrl>span:nth-child(3)").css("textShadow", "0 0 15px");
            break;
          case "Digit3":
            // Switch to octave 3
            activeOct = 3;
            $("#octCtrl>span").css("color", "#FAC560");
            $("#octCtrl>span").css("textShadow", "0 0 0");
            $("#octCtrl>span:nth-child(4)").css("color", "mediumspringgreen");
            $("#octCtrl>span:nth-child(4)").css("textShadow", "0 0 15px");
            break;
          case "Digit4":
            // Switch to octave 4
            activeOct = 4;
            $("#octCtrl>span").css("color", "#FAC560");
            $("#octCtrl>span").css("textShadow", "0 0 0");
            $("#octCtrl>span:nth-child(5)").css("color", "mediumspringgreen");
            $("#octCtrl>span:nth-child(5)").css("textShadow", "0 0 15px");
            break;
          case "Digit5":
            // Switch to octave 5
            activeOct = 5;
            $("#octCtrl>span").css("color", "#FAC560");
            $("#octCtrl>span").css("textShadow", "0 0 0");
            $("#octCtrl>span:nth-child(6)").css("color", "mediumspringgreen");
            $("#octCtrl>span:nth-child(6)").css("textShadow", "0 0 15px");
            break;
        }
      }
      activeKeys.push(e.code);
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
            $("#noteCtrl>span:nth-child(1)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(1)").css("textShadow", "0 0 0");
            break;
          case "KeyW":
            // C# / Db
            eval(selectedIns).stop("C#" + activeOct);
            $("#noteCtrl>span:nth-child(2)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(2)").css("textShadow", "0 0 0");
            break;
          case "KeyS":
            // D
            eval(selectedIns).stop("D" + activeOct);
            $("#noteCtrl>span:nth-child(3)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(3)").css("textShadow", "0 0 0");
            break;
          case "KeyE":
            // D# / Eb
            eval(selectedIns).stop("D#" + activeOct);
            $("#noteCtrl>span:nth-child(4)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(4)").css("textShadow", "0 0 0");
            break;
          case "KeyD":
            // E
            eval(selectedIns).stop("E" + activeOct);
            $("#noteCtrl>span:nth-child(5)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(5)").css("textShadow", "0 0 0");
            break;
          case "KeyF":
            // F
            eval(selectedIns).stop("F" + activeOct);
            $("#noteCtrl>span:nth-child(6)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(6)").css("textShadow", "0 0 0");
            break;
          case "KeyT":
            // F# / Gb
            eval(selectedIns).stop("F#" + activeOct);
            $("#noteCtrl>span:nth-child(7)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(7)").css("textShadow", "0 0 0");
            break;
          case "KeyG":
            // G
            eval(selectedIns).stop("G" + activeOct);
            $("#noteCtrl>span:nth-child(8)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(8)").css("textShadow", "0 0 0");
            break;
          case "KeyY":
            // G# / Ab
            eval(selectedIns).stop("G#" + activeOct);
            $("#noteCtrl>span:nth-child(9)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(9)").css("textShadow", "0 0 0");
            break;
          case "KeyH":
            // A
            eval(selectedIns).stop("A" + activeOct);
            $("#noteCtrl>span:nth-child(10)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(10)").css("textShadow", "0 0 0");
            break;
          case "KeyU":
            // A# / Bb
            eval(selectedIns).stop("A#" + activeOct);
            $("#noteCtrl>span:nth-child(11)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(11)").css("textShadow", "0 0 0");
            break;
          case "KeyJ":
            // B
            eval(selectedIns).stop("B" + activeOct);
            $("#noteCtrl>span:nth-child(12)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(12)").css("textShadow", "0 0 0");
            break;
          case "KeyK":
            // C + 12
            eval(selectedIns).stop("C" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(13)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(13)").css("textShadow", "0 0 0");
            break;
          case "KeyO":
            // C# / Db + 12
            eval(selectedIns).stop("C#" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(14)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(14)").css("textShadow", "0 0 0");
            break;
          case "KeyL":
            // D + 12
            eval(selectedIns).stop("D" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(15)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(15)").css("textShadow", "0 0 0");
            break;
          case "KeyP":
            // D# / Eb + 12
            eval(selectedIns).stop("D#" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(16)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(16)").css("textShadow", "0 0 0");
            break;
          case "Semicolon":
            // E + 12
            eval(selectedIns).stop("E" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(17)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(17)").css("textShadow", "0 0 0");
            break;
          case "Quote":
            // F + 12
            eval(selectedIns).stop("F" + (activeOct + 1));
            $("#noteCtrl>span:nth-child(18)").css("color", "#FAC560");
            $("#noteCtrl>span:nth-child(18)").css("textShadow", "0 0 0");
            break;
        }
      }
      activeKeys.splice(activeKeys.indexOf(e.code), 1);
    }
  });

  // Updates the color of the tempo selector to match the slider gradient positioning
  // based on the tempo value
  function tempoColorChange(tempoValue) {
    var colorVar;
    if(tempoValue < 107) {
      colorVar = ((tempoValue - 40) / 67) * 255;
      $("#tempoSelect>fieldset>label, #tempoVal").css("color",
      ("rgb(0, " + colorVar + ", " + (255 - colorVar) + ")"));
      $("#tempoSelect>fieldset").css("borderColor",
      ("rgb(0, " + colorVar + ", " + (255 - colorVar) + ")"));
      $("#tempoSelect>fieldset").css("boxShadow",
      ("0 0 10px 2px rgb(0, " + colorVar + ", " + (255 - colorVar) + ")"));
    }
    else if(tempoValue < 174) {
      colorVar = ((tempoValue - 107) / 67) * 255;
      $("#tempoSelect>fieldset>label, #tempoVal").css("color", ("rgb(" + colorVar + ", 255, 0)"));
      $("#tempoSelect>fieldset").css("borderColor", ("rgb(" + colorVar + ", 255, 0)"));
      $("#tempoSelect>fieldset").css("boxShadow", ("0 0 10px 2px rgb(" + colorVar + ", 255, 0)"));
    }
    else {
      colorVar = 255 - (((tempoValue - 174) / 66) * 255);
      $("#tempoSelect>fieldset>label, #tempoVal").css("color", ("rgb(255, " + colorVar + ", 0)"));
      $("#tempoSelect>fieldset").css("borderColor", ("rgb(255, " + colorVar + ", 0)"));
      $("#tempoSelect>fieldset").css("boxShadow", ("0 0 10px 2px rgb(255, " + colorVar + ", 0)"));
    }
  }

  // Prevents input exploit
  $("#tempoSelect").submit(function(e) { e.preventDefault(); });
  // Updates numerical tempo value on page and sends tempo in ms to ChucK
  $("#tempo").on("input", function() {
    $("#tempoVal").val($(this).val());
    $("#tempoSelect>fieldset, #tempoVal").css("transitionDuration", "0s");
    tempoColorChange($(this).val());
    // Tempo is calculated by 60 seconds per min over the BPM value to get how many seconds a quarter note takes
    tempoTick = 60 / $(this).val();
    // This is then divided by 8 to get the time of a 32nd note -- the fundamental time unit for this app
    tempoTick /= 8;
  });
  // Updates tempo slider position to match
  $("#tempoVal").on("input", function() {
    if($(this).val() > 39 && $(this).val() < 241) {
      $("#tempo").val($(this).val());
      $("#tempoSelect>fieldset, #tempoVal").css("transitionDuration", "1s");
      tempoColorChange($(this).val());
      // Tempo is calculated by 60 seconds per min over the BPM value to get how many seconds a quarter note takes
      tempoTick = 60 / $(this).val();
      // This is then divided by 8 to get the time of a 32nd note -- the fundamental time unit for this app
      tempoTick /= 8;
    }
  });
  $("#tempoVal").focusout(function() { $(this).val($("#tempo").val()); });

  // Modal sequencing variables
  let drag = false;
  let octave = 3;
  let tempoTick = 0.0625 // Seconds per 32nd note

  $("body").mouseup(function() { drag = false; });

  // Note sequence declarations (not actually unused, called in eval)
  let sawSeq = [];
  let sqSeq = [];
  let sinSeq = [];
  let triSeq = [];

  // Script for playing a sequence
  function playSequence(tableArr) {
    // Process the 32 "ticks" per measure
    let instrument = "";
    let insVol = 0.1;
    if(tableArr === "none") {
      tableArr = $(this).parents().eq(3).siblings().text();
      switch(tableArr) {
        case "Saw Sequencing":
          tableArr = "sawSeq";
          instrument = "saw";
          insVol = sawVol;
          break;
        case "Square Sequencing":
          tableArr = "sqSeq";
          instrument = "square";
          insVol = sqVol;
          break;
        case "Sine Sequencing":
          tableArr = "sinSeq";
          instrument = "sine";
          insVol = sinVol;
          break;
        case "Triangle Sequencing":
          tableArr = "triSeq";
          instrument = "triangle";
          insVol = triVol;
          break;
      }
    }
    else if(tableArr === "sawSeq") {
      instrument = "saw";
      insVol = sawVol;
    }
    else if(tableArr === "sqSeq") {
      instrument = "square";
      insVol = sqVol;
    }
    else if(tableArr === "sinSeq") {
      instrument = "sine";
      insVol = sinVol;
    }
    else if(tableArr === "triSeq") {
      instrument = "triangle";
      insVol = triVol;
    }
    let ctr = 1;
    $("#beatCount>p>span").css("color", "#FAC560").css("textShadow", "0 0 0");
    $(".downbeat:nth-child(1)").css("color", "mediumspringgreen").css("textShadow", "0 0 15px");
    // Sort sequence input data
    console.log($(this));
    console.log(tableArr);
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
          if(eval(tableArr)[i].attr("class").split(/\s+/).length === 3) {
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
                  sustain: insVol,
                  hold: noteLen,
                  release: 0
                }
              });
            }
          }
        }
        console.log(ctr);
        ctr++;
        $("#beatCount>p>span").css("color", "#FAC560").css("textShadow", "0 0 0");
        $("#beatCount>p>span:nth-child(" + Math.ceil(ctr / 2) + ")").css("color", "mediumspringgreen");
        $("#beatCount>p>span:nth-child(" + Math.ceil(ctr / 2) + ")").css("textShadow", "0 0 15px");
        if(ctr < 33) { sequentialize(); }
      }, (tempoTick * 1000));
    }
    sequentialize();
  }

  function modListen() {

    $(".seqTable>div").off();
    $("button[name='seqPlayTog']").off();
    $("input[name='seqLoop']").off();

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
        eval(tableArr).splice($.inArray($(this), eval(tableArr)), 1);
        $(this).removeClass(classArr[2]);
        $(this).css("backgroundColor", "#333");
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
          eval(tableArr).splice($.inArray($(this), eval(tableArr)), 1);
          $(this).removeClass(classArr[2]);
          $(this).css("backgroundColor", "#333");
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

    let loop = $("#seqLoop").prop("checked"); // Uses ID but working for now?
    let intId = null;

    $("input[name='seqLoop']").change(function() {
      if(loop && intId) {
        clearInterval(intId);
        intId = null;
      }
      loop = $(this).is(":checked");
      console.log(loop);
    });

    $("button[name='seqPlayTog']").click(function() {
      let obj = this;
      if(loop) {
        playSequence.call(obj, "none");
        intId = setInterval(function() {
          playSequence.call(obj, "none");
        }, (tempoTick * 38000)); // Hackjob, setInterval inherently unreliable
      }
      else { playSequence.call(obj, "none"); }
    });

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
        $(this).children().css("backgroundColor", "#333");
      });
    });
  }

  let loopAll = $("#seqLoopAll").prop("checked");
  let intIdAll = null;

  $("#seqLoopAll").change(function() {
    if(loopAll && intIdAll) {
      clearInterval(intIdAll);
      intIdAll = null;
    }
    loopAll = $(this).is(":checked");
    console.log(loopAll);
  });

  $("#playAll").click(function() {
    let obj = this;
    if(selectedIns !== "saw") { playSequence.call(obj, "sawSeq"); }
    if(selectedIns !== "square") { playSequence.call(obj, "sqSeq"); }
    if(selectedIns !== "sine") { playSequence.call(obj, "sinSeq"); }
    if(selectedIns !== "triangle") { playSequence.call(obj, "triSeq"); }
    if(loopAll) {
      intIdAll = setInterval(function() {
        playSequence.call(obj, "sawSeq");
        playSequence.call(obj, "sqSeq");
        playSequence.call(obj, "sinSeq");
        playSequence.call(obj, "triSeq");
      }, (tempoTick * 38000)); // Hackjob, setInterval inherently unreliable
    }
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
      $(".o3").show(1);
      octave = 3;
      $("input[name='octave']").val(octave);
      $(".jBox-container").css("background", "#333");
      $(".jBox-title").css("background", "linear-gradient(indigo, #333)");
      $(".jBox-title").css("borderColor", "#333");
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
      $(".o3").show(1);
      octave = 3;
      $("input[name='octave']").val(octave);
      $(".jBox-container").css("background", "#333");
      $(".jBox-title").css("background", "linear-gradient(indigo, #333)");
      $(".jBox-title").css("borderColor", "#333");
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
      $(".o3").show(1);
      octave = 3;
      $("input[name='octave']").val(octave);
      $(".jBox-container").css("background", "#333");
      $(".jBox-title").css("background", "linear-gradient(indigo, #333)");
      $(".jBox-title").css("borderColor", "#333");
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
      $(".o3").show(1);
      octave = 3;
      $("input[name='octave']").val(octave);
      $(".jBox-container").css("background", "#333");
      $(".jBox-title").css("background", "linear-gradient(indigo, #333)");
      $(".jBox-title").css("borderColor", "#333");
    }
  });
});