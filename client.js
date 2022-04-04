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

  function modListen() {

    let noteSeq = [];

    $(".seqTable>div").off();

    $(".seqTable>div").mousedown(function() {
      drag = true;
      // Remember to implement proper multi-octave support
      if($(this).hasClass("o1")) {
        $(this).removeClass("o1");
        noteSeq.splice($.inArray($(this), noteSeq), 1);
        console.log("yes");
        $(this).css("backgroundColor", "white");
      }
      else {
        // Multi-color descision tree thing here
        // But for now...
        $(this).addClass($(this).parent().attr("class").split(/\s+/)[2]);
        $(this).css("backgroundColor", "tomato");
        noteSeq.push($(this));
        console.log(noteSeq.sort());
      }
      // if($(this).hasClass("r12")) {

      // }
    });

    $(".seqTable>div").mouseenter(function() {
      if(drag) {
        // Remember to implement proper multi-octave support
        if($(this).hasClass("o1")) {
          $(this).removeClass("o1");
          noteSeq.splice($.inArray($(this), noteSeq), 1);
          console.log("yes");
          $(this).css("backgroundColor", "white");
        }
        else {
          // Multi-color descision tree thing here
          // But for now...
          $(this).addClass($(this).parent().attr("class").split(/\s+/)[2]);
          $(this).css("backgroundColor", "tomato");
          noteSeq.push($(this));
          console.log(noteSeq.sort());
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

    // Script for playing a sequence
    $("button[name='seqPlayTog']").click(function() {
      // Tempo = 60 BPM for now (1/32nd note = 0.125s)
      // Process the 32 "ticks" per measure
      let ctr = 1;
      function sequentialize() {
        setTimeout(() => {
          // Find out what notes are triggering on this tick
          for(let i = 0; i < noteSeq.length; i++) {
            if(noteSeq[i].hasClass("c" + ctr)) {
              // FOr each triggered note, search ahead to see how long it should be sustained
              let noteLen = 0.125;
              // Proxy note object
              let scanNote = noteSeq[i].clone()
                .removeClass("c" + ctr).addClass("c" + (ctr + 1))
                .removeClass("o1").addClass("o1");
              for(let j = 0; j < noteSeq.length; j++) {
                // See if "one tick ahead" exists
                if(noteSeq[j].attr("class") === scanNote.attr("class")) {
                  // Increment proxy note and reset counter to continue looking ahead
                  let prevCtr = scanNote.attr("class").split(/\s+/)[1];
                  let nextNum = prevCtr[2] ? parseInt((prevCtr[1] + prevCtr[2])) + 1
                    : parseInt(prevCtr[1]) + 1;
                  // console.log(scanNote);
                  scanNote.removeClass(prevCtr).addClass("c" + nextNum)
                    .removeClass("o1").addClass("o1");
                  // console.log(scanNote);
                  noteLen += 0.125;
                  console.log(noteLen);
                  j = 0; // Still inconsistent depending on input order
                  // Look into array sorting
                }
              }
            }
          }
          console.log(ctr);
          ctr++;
          if(ctr < 33) { sequentialize(); }
        }, 125);
      }
      sequentialize();
    });
  }

  // Modal declarations
  new jBox("Modal", {
    attach: "#sawMod",
    title: "Sequencing Test",
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
    title: "Sequencing Test",
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
    title: "Sequencing Test",
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
    title: "Sequencing Test",
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