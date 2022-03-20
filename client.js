$(document).ready(function() {

  let saw = new Wad({source: "sawtooth", pitch: "C2", env: {hold: -1}});
  let square = new Wad({source: "square", pitch: "G3", env: {hold: -1}});
  let sine = new Wad({source: "sine", pitch: "Db3", env: {hold: -1}});
  let triangle = new Wad({source: "square", pitch: "D#3", env: {hold: -1}});
  let playStatus = "none";
  let drag = false;

  // $("body").mousedown(function() { drag = true; });

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

  // Every other one works?
  $("#seqTable>div").mousedown(function() {
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

  $("#seqTable>div").mouseenter(function() {
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

  new jBox("Modal", {
    attach: "#modTest",
    title: "Sequencing Test",
    width: "100%",
    height: "100%",
    content: $("#seqContainer")
  });
});