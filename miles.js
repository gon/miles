var _prospects = [];

$(document).ready(function() {

  addSampleData(4);
  $(".prospect").click( function() {expandProspect(this);} );
  $(".send").click( function() {sendMessage(this);} );
  
  setInterval(function () {checkForMessage();}, 1000);
  
});

function checkForProspect ()
{
  
//  $.get('http://jeremylubin.com/get_message.php', function (data) {receiveMessage(3, data);});
  $.ajax({
          url: 'http://miles.minute.im/get_message.php/?sender=consumer',
          dataType: 'jsonp',
          success:function (data) {receiveMessage(_prospects.length-1, data);}});
}

function addSampleData (sampleCount)
{  
  for (var i = 0 ; i < sampleCount ; i++)
  {
    if (i == 0) {
      receiveProspect("@jugglerjer", "25", "male", 50, ["sports", "travel", "Lakers"], false);
    }
    else if (i == 1) {
      receiveProspect("@awesomepete28", "40", "male", 64, ["technology", "coding", "Star Trek"], false);
    }
    else if (i == 2) {
      receiveProspect("@planejanefromspain", "28", "female", 64, ["coffee", "architecture", "botany"], false);
    }
    else if (i == 3) {
      receiveProspect("@gonzif", "30", "male", 80, ["fashion", "food", "technology"], false);
    }
  }
}

function expandProspect(prospect)
{  
  if($(prospect).hasClass("open")) {
    //closeProspect(prospect);
  }
  else {
    openProspect(prospect);
  }
}

function openProspect (prospect)
{
  $(prospect).children(".conversation").removeClass("hidden");
  $(prospect).addClass("open");
  $(prospect).children(".conversation").children(".compose_box").children(".compose").focus();
  
  
  $(".prospect").css("opacity", "0.5");
  $(prospect).css("opacity", "1");
}

function closeProspect (prospect)
{
  if ($(prospect).children(".compose").is(":focus")) {return;}
  
  $(prospect).children(".conversation").addClass("hidden");
  $(prospect).removeClass("open");
}

function sendMessage (button)
{
  // Get the parent prospect element and adjacent message text
  var prospect = $(button).parents(".prospect");
  var message = $(prospect).children(".conversation").children(".compose_box").children(".compose").val();
  
  // Check whether there's text to send
  if (message == "") {return;}
  
  // Send the message
  $(prospect).children(".conversation").children(".chat").append("<div class='comment business'>" + message + "</div>");
  
  // Clear the text field
  $(prospect).children(".conversation").children(".compose_box").children(".compose").val("");
  
  message = encodeURIComponent(message);
  
  //$.get('http://miles.minute.im/miles.php/?sender=business&message=' + message);
  
  $.ajax({
            url: 'http://miles.minute.im/miles.php/?sender=business&message=' + message,
            dataType: 'jsonp'});
  
}

function checkForMessage ()
{
  
//  $.get('http://jeremylubin.com/get_message.php', function (data) {receiveMessage(3, data);});
  $.ajax({
          url: 'http://miles.minute.im/get_message.php/?sender=consumer',
          dataType: 'jsonp',
          success:function (data) {receiveMessage(_prospects.length-1, data);}});
}

function receiveMessage (customerID, message)
{
  // Get the correct prospect for which to display the message
  var prospect = $("[id=" + customerID + "]");
  
  // Check whether the message is blank
  if (message == "") {return;}
  
  // Send the message
  $(prospect).children(".conversation").children(".chat").append("<div class='comment customer'>" + message + "</div>");
}

function receiveProspect (name, age, gender, score, interests, live)
{
  // Determine prospect rank
  // For now, it's rank #1
  var customerID = _prospects.length;
  
  var newProspect = {'name': name,
                     'age': age,
                     'gender': gender,  
                     'score': score,
                     'interests': interests,
                     'customerID': customerID};
  _prospects.push(newProspect);
  
  displayProspect(newProspect, live);
}

function displayProspect(newProspect, animated)
{
  var HTML = "";
  HTML += "<div class='prospect' id='" + newProspect.customerID + "'>";
  HTML +=   "<div class='name'><span class='name_text'><img class='name_icon' src='twitter.png' />" + newProspect.name + " | " + newProspect.age + " | " + newProspect.gender + "</span></div>";
  HTML +=   "<div class='match'><span class='score'>100%</span></div>";
  HTML +=   "<div class='influence'><span class='influence_text'><img class='influence_icon' src='influence.png' />" + newProspect.score + " Klout</span></div>";
  HTML +=   "<div class='interests'><span class='interest_text'><img class='interests_icon' src='interests.png' />Influential in ";
  for (var interest in newProspect.interests) {
    HTML +=   newProspect.interests[interest];
    if (interest < newProspect.interests.length - 2)
    {
      HTML += ", ";  
    }
    else if (interest == newProspect.interests.length - 2)
    {
      HTML += " and ";
    }
  }
  HTML +=   "</span></div>";
  HTML +=   "<div class='conversation hidden'>";
  HTML +=     "<div class='chat'></div>";
  HTML +=     "<div class='compose_box'><input class='compose' type='text' name='message' value='' placeholder=\"Make an offer they can't refuse :-)\"/></div>";
  HTML +=     "<input class='send' type='submit' name='send' value='Send'/>";
  HTML +=   "</div>";
  HTML += "</div>";
  
  var prospect = $("[id=" + newProspect.customerID + "]");
  
  if (animated)
  {
    $("#prospects").prepend(HTML);
    $(prospect).css("display", "none").slideDown();
  }
  else {
    $("#prospects").prepend(HTML);
  }
  
  $(".prospect").click( function() {expandProspect(this);} );
  $(".send").click( function() {sendMessage(this);} );
}
