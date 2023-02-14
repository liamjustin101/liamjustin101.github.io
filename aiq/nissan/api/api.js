/* NMT */
var apiBasePathNmt = "https://virtserver.swaggerhub.com/LiamStudio/nmt-crm_api/v1-oas3/api/"
var verifyOwnershipUrl = apiBasePathNmt + "VerifyNissanOwnership"


/* Admin */
var apiBasePathAdmin = "https://nissan.thplayground.app/api/v1/"
var addNewLeadUrl = apiBasePathAdmin + "customers"

/* NLTH */

/* NMT */
$('#verifyOwnershipBtn').on('click', function(event) {
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");
  var jqxhr = $.post(verifyOwnershipUrl, function() {

  })
  .done(function(data) {
    console.log(data)
    $("#responseNmt").css("text-align", "left");
    $('#responseNmt').html(JSON.stringify(data, null, 4));
    $("#spinnerNmt").hide();
  })
  .fail(function() {
    $("#responseNmt").css("text-align", "center");
    $('#responseNmt').html("Error");
  })
  .always(function() {
     $("#spinnerNmt").hide();
  });
});

/* Admin */
$('#addNewLeadBtn').on('click', function(event) {
  $("#spinnerAdmin").show();
  $('#responseAdmin').html("Loading...");
  $("#responseAdmin").css("text-align", "center");
  $("#spinnerAdmin").css("display", "inline-block");

  var jqxhr = $.post(addNewLeadUrl,
  {
    firstName: "Liam",
    lastName: "Justin",
    phoneNumber: "0892223333",
    emailAddress: "liamjustin999@gmail.com",
    lineUid: "U847430d17de9d20a3e27d12a69b39884",
    customerType: "prospect",
    bu: "nmt"
  }
  , function() {

  })
  .done(function(data) {
    $("#responseAdmin").css("text-align", "left");
    $('#responseAdmin').html(JSON.stringify(data, null, 4));
    $("#spinnerAdmin").hide();
  })
  .fail(function(request, status, error) {
    $("#responseAdmin").css("text-align", "center");
    $('#responseAdmin').html("Error");
  })
  .always(function() {
     $("#spinnerAdmin").hide();
  });
});


/* NLTH */

      
  