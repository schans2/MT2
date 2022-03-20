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

    $(".seqTable>div").off();

    $(".seqTable>div").mousedown(function() {
      drag = true;
      if($(this).hasClass("note")) {
        $(this).removeClass("note");
        $(this).css("backgroundColor", "white");
      }
      else {
        // Multi-color descision tree thing here
        // But for now...
        $(this).addClass("note");
        $(this).css("backgroundColor", "tomato");
      }
      // if($(this).hasClass("r12")) {

      // }
    });

    $(".seqTable>div").mouseenter(function() {
      if(drag) {
        if($(this).hasClass("note")) {
          $(this).removeClass("note");
          $(this).css("backgroundColor", "white");
        }
        else {
          // Multi-color descision tree thing here
          // But for now...
          $(this).addClass("note");
          $(this).css("backgroundColor", "tomato");
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