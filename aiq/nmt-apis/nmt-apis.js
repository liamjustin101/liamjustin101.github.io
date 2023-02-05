/* API paths and urls */
var apiBasePath = "https://virtserver.swaggerhub.com/LiamStudio/nmt-crm_api/v1-oas3/api/"
var verifyOwnershipUrl = apiBasePath + "VerifyNissanOwnership"

/* Call API and display response */
$('#verifyOwnershipBtn').on('click', function(event) {
  $("#spinner").show();
  $('#response').html("Loading...");
  $("#response").css("text-align", "center");
  $("#spinner").css("display", "inline-block");
  var jqxhr = $.post(verifyOwnershipUrl, function() {

  })
  .done(function(data) {
    console.log(data)
    $("#response").css("text-align", "left");
    $('#response').html(JSON.stringify(data, null, 4));
    $("#spinner").hide();
  })
  .fail(function() {
    $("#response").css("text-align", "center");
    $('#response').html("Error");
  })
  .always(function() {
            
  });
});

      
  