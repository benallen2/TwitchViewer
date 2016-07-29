var player;

function insHtml(streamer, game, viewers, icon, summary){
  var html = "<div class='on' id='" + streamer +"'><a id='anchor'><img id='icon' src='" + icon + "' /><ul><li>";
  html += "<span id='staticlist'> Streamer: </span>" + streamer + "</li>";
  html += "<li><span id='staticlist'> Playing: </span>" + game + "</li>";
  html += "<li><span id='staticlist'> Viewers: </span>" + viewers + "</li></ul></a></div>";
  $("#streamlist").append(html);
  $("#" + streamer).click(function(){
    summaryUpdate(summary);
    channelChange(streamer);
  })
}


function channelChange(streamer){
        player.setChannel(streamer);
}

function summaryUpdate(summary){
  $("#summary").empty();
    $("#summary").append(summary);
}

function streamersInfo() {
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams?game=Starcraft%20II&limit=10&callback=?",
    dataType: "jsonp",
    contentType: 'application/json',
    cache: false,
    success: function(data) {
      $("#streamlist").empty();
      for (var i = 0; i < data.streams.length; i++) {    
        insHtml(data.streams[i].channel.display_name, data.streams[i].channel.game, data.streams[i].viewers, data.streams[i].channel.logo, data.streams[i].channel.status);
      }      
    }
  })
};

function featHtml(streamer, game, viewers, icon, summary){
  var feahtml = "<div class='on' id='" + streamer + "'><a><img id='icon' src='" + icon + "' /><ul><li>";
  feahtml += "<span id='staticlist'> Streamer: </span>" + streamer + "</li>";
  feahtml += "<li><span id='staticlist'> Playing: </span>" + game + "</li>";
  feahtml += "<li><span id='staticlist'> Viewers: </span>" + viewers + "</li></ul></a></div>";
   $("#featuredlist").prepend(feahtml);
   $("#" + streamer).click(function(){
    summaryUpdate(summary);
    channelChange(streamer);
  })
}


function offline(name){
  var offhtml = "<div id='off'><img id='icon' src='https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png'<ul><li>";
  offhtml += "<span id='staticlist'> Streamer: </span>" + name + "</li></br>";
  offhtml += "<li><strong>Offline</strong></li>"
  $("#featuredlist").append(offhtml);
}      

var streams = ["BASETRADETV", "ESL_SC2", "Liquid_TLO", "MDStephano", "GosuGamers", "polt", "DreamhackSC2", "FreeCodeCamp", "CranK"];

function getFeatStreams(streams){
  
  $.ajax({
    url: "https://api.twitch.tv/kraken/streams?channel=" + streams[streams.length-1] + "&callback=?",
    dataType: "jsonp",
    contentType: "application/json",
    cache: false,
    success: function(data){
      if (data._total === 0){
        offline(streams[streams.length - 1]);
      }
      else {
        featHtml(data.streams[0].channel.display_name, data.streams[0].game, data.streams[0].viewers, data.streams[0].channel.logo, data.streams[0].channel.status);      
      }
      if(streams.length > 1){
        streams.pop();
        getFeatStreams(streams);
      }
    }
  })  
}


$(document).ready(function(){
  getFeatStreams(streams);
  $("#refresh").click(function(){
    streamersInfo();
    $("#refresh").html("Refresh");
  })
        var options = {
        width: 900,
        height: 590,
        channel: "Twitch",      
    };
    player = new Twitch.Player("mainvid", options);
    player.setVolume(0.5);
  
});
