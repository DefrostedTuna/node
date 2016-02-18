$(function() {
  var LodestoneCharacterName = ($('#h-character-name').val() ? $('#h-character-name').val() : "Shinichi Sagara");
  var LodestoneCharacterServer = ($('#h-character-server').val() ? $('#h-character-server').val() : "Adamantoise" );

  LodestoneAPI.Search.Character(LodestoneCharacterName, LodestoneCharacterServer, function(Character) {
    if(Character) {
      console.log(Character);
      // Character name, job level and class
      $('.character-name').append(Character.name);
      $('.character-joblv').append("<p>Lv " + Character.activeLevel + " " + (Character.activeJob ? Character.activeJob : Character.activeClass) + "</p>");
      // Character portrait
      $('.character-portrait').append("<img src=" + Character.portrait + "/>");
      // FC Info
      $('.character-gcinfo').prepend('<h4>' + Character.freeCompany + '</h4>');
      $.each(Character.grandCompany, function (array, grandCompany) {
        $('.character-gcinfo').append(
          "<p><span><img src='" + grandCompany.icon + "'/></span>" +
          '<span> ' + grandCompany.rank + '</span></p>');
        console.log(grandCompany.company + grandCompany.rank);
      });
      // Classes section
      $('.character-class-wrap').prepend("<h4>Classes</h4>");
      $.each(Character.classjobs, function (array, job) {
        $(".character-classes").append("<div class='character-class'>" +
          "<p><span>" +
          job.level +
          "</span>" +
          job.name +
          "</p>");
      });
      // Minions section
      $('.character-minion-wrap').prepend("<h4>Minions</h4>");
      $.each(Character.minions, function (array, minion) {
        $(".character-minions").append("<img src='" + minion.icon + "' alt='" + minion.name + "'/>");
      });
      //Mounts section
      $('.character-mount-wrap').prepend("<h4>Mounts</h4>");
      $.each(Character.mounts, function (array, mount) {
        $(".character-mounts").append("<img src='" + mount.icon + "' alt='" + mount.name + "'/>");
      });
      // Load the content only after the div is ready to be loaded
      $('.character-portrait img').one('load', function() {
        $('.lodestone-wrapper').css({
          "left" : "0",
          "opacity" : "1"
        });
      });
    } else {
      console.log("Couldn't find it bro!");
    }
  });
  // End Lodestone Stuff
  //======================
});
