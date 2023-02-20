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

  var contentType = $('#contentType').find(":selected").val();
  if(contentType == "application/x-www-form-urlencoded")
  {

    var jqxhr = $.post(addNewLeadUrl,
    {
      firstName: "Liam",
      lastName: "Justin",
      phoneNumber: "0892223333",
      emailAddress: "liamjustin999@gmail.com",
      //lineUid: "U847430d17de9d20a3e27d12a69b39884",
      lineUid: "U7cbc31a83b052dce23f5446559fb6c73",
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
      console.log(request)
      $("#responseAdmin").css("text-align", "center");
      $('#responseAdmin').html("Error");
    })
    .always(function() {
       $("#spinnerAdmin").hide();
    });
  }
  else if(contentType == "application/json")
  {
    $.ajax({
      url: addNewLeadUrl,
      type: 'POST',
      data: 
      JSON.stringify({
        firstName: "Liam",
        lastName: "Justin",
        phoneNumber: "0892223333",
        emailAddress: "liamjustin999@gmail.com",
        lineUid: "U847430d17de9d20a3e27d12a69b39884",
        customerType: "prospect",
        bu: "nmt"
      }),
      contentType: contentType + '; charset=utf-8',
      success: function (response) {
        
      },
      error: function () {
        
      }
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
  }
  else if(contentType == "multipart/form-data")
  {
    var formData = new FormData();
    formData.append('firstName', 'Liam');
    formData.append('lastName', 'Justin');
    formData.append('phoneNumber', '0892223333'); 
    formData.append('emailAddress', 'liamjustin999@gmail.com')
    formData.append('lineUid', 'U847430d17de9d20a3e27d12a69b39884')
    formData.append('customerType', 'prospect')
    formData.append('bu', 'nmt')
    $.ajax({
      url: addNewLeadUrl,
      type: 'POST',
      contentType: false,
      processData: false, 
      data: formData,
      success: function (response) {
        
      },
      error: function () {
        
      }
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
  }
});


/* NLTH */

      
  