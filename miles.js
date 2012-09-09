var _prospects = [];

$(document).ready(function() {

  addSampleData(4);
  $(".prospect").click( function() {expandProspect(this);} );
  $(".send").click( function() {sendMessage(this);} );
  
});

function addSampleData (sampleCount)
{
  for (var i = 0 ; i < sampleCount ; i++)
  {
    receiveProspect(80, ["fashion", "food", "technology"], false);
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

function receiveProspect (score, interests, live)
{
  // Determine prospect rank
  // For now, it's rank #1
  var customerID = _prospects.length;
  
  var newProspect = {'score': score,
                     'interests': interests,
                     'customerID': customerID};
  _prospects.push(newProspect);
  
  displayProspect(newProspect, live);
}

function displayProspect(newProspect, animated)
{
  var HTML = "";
  HTML += "<div class='prospect' id='" + newProspect.customerID + "'>";
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
