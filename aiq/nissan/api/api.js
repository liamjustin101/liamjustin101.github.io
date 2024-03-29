/* Proxy */
var proxyServerUrl = "https://liamstudio.com/api-proxy/?url="
/* Google Map */
var distanceMatrixUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?"
var googleMapApiKey = "AIzaSyAsx7r-8BIp4eMitPikK3f9J5uLkNILDt0"
var dealerNames = [
  "A","B","C","D"
]
var userLat
var userLong
var markerIconUrl = "https://static.wixstatic.com/media/de2f98_7aff7a58443b42a2857b87f3d14ce15b~mv2.png"
var mockMarker
var matrixResult = ""

/* NMT */
var apiBasePathNmt = "https://virtserver.swaggerhub.com/LiamStudio/nmt-crm_api/v1-oas3/api/"
var verifyOwnershipUrl = apiBasePathNmt + "VerifyNissanOwnership"
var getSessionIdUrl = "https://qa.nissancmp.com/controller/registerSystems"
var registerConsentUrl = "https://qa.nissancmp.com/controller/registerConsent"
var getSessionIdUrlProd = "https://nissancmp.com/controller/registerSystems";
var registerConsentUrlProd = "https://nissancmp.com/controller/registerConsent";
var cmsAppId = "LIN77770AUioSwm52289yuTtOOl2PoK2K6Y333ZZ"
var cmsAppIdProd = "INT93wh0UUioSwm5LNC123Rt22l4LsK2K6Yfv96Z"

/* Admin */
var apiBasePathAdmin = "https://nissan.thplayground.app/api/v1/"
var addNewLeadUrl = proxyServerUrl + apiBasePathAdmin + "customers"

/* NLTH */

/* Google Map */

/* SMS */
var sendSmsUrl = proxyServerUrl + "https://api-v2.thaibulksms.com/sms"
var smsUsername = "rM5p0k53ca00jR3hcn_R8yq30Tl-a1"
var smsPassword = "BDdF8IgZ3MmISI-Q38Th50nlqkBbbJ"

function getLongAndLat() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}
function getDistanceMatrix(userCoord) {
  matrixResult = "Calculating distance matrix...";
  userLat = userCoord.lat
  userLong = userCoord.lng
  if(typeof userLat === 'undefined' || typeof userLong === 'undefined')
  {
    matrixResult = "Error: Cannot read your current location."
    $("#matrixResult").html(matrixResult);

    $("#spinnerNmt").hide();
    
    return
  }
  $('#your-loc-lat').html(userLat.toFixed(7))
  $('#your-loc-long').html(userLong.toFixed(7))
  var origin1 = { lat: userLat, lng: userLong };
  var destinationA = { lat: parseFloat(dealers[0].lat), lng: parseFloat(dealers[0].long) };
  var destinationB = { lat: parseFloat(dealers[1].lat), lng: parseFloat(dealers[1].long) };
  var destinationC = { lat: parseFloat(dealers[2].lat), lng: parseFloat(dealers[2].long) };
  var destinationD = { lat: parseFloat(dealers[3].lat), lng: parseFloat(dealers[3].long) };
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationA, destinationB, destinationC, destinationD],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }, callback);

  function callback(response, status) {
    var data = response
    $("#responseNmt").css("text-align", "left");
    $('#responseNmt').html(JSON.stringify(data, null, 4));
    $("#spinnerNmt").hide();
    
    if(status == "OK")
    {
      matrixResult = "";
      var results = data.rows[0].elements
      for(i=0;i<results.length;i++)
      {
        results[i].id = i
      }
      results.sort((a, b) => a.distance.value - b.distance.value)
      
      for(i=0;i<results.length;i++)
      {
        matrixResult += dealerNames[results[i].id]
        if(i<results.length-1)
          matrixResult += " \u279c "
      }
    }
    else
    {
      matrixResult = "Error"
    }

    $("#matrixResult").html(matrixResult);
    $("#spinnerNmt").hide();
    $("#resultBox").show();
    
  }
}
$('#getDistanceMatrixBtn').on('click', async function(event) {
  
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");

  var userCoord = await getLongAndLat()
  getDistanceMatrix({ lat: userCoord.coords.latitude, lng: userCoord.coords.longitude })
  
  
});

$('#getDistanceMatrixFromMockLocBtn').on('click', async function(event) {
  
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");

  var userCoord = { lat: mockMarker.getPosition().lat(), lng: mockMarker.getPosition().lng() }
  
  getDistanceMatrix(userCoord)
  

});

$('#getLocationFromPlaceBtn').on('click', async function(event) {
  
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");

 
  userLat = markerOnPlace.getPosition().lat()
  userLong = markerOnPlace.getPosition().lng()
 
  if(typeof userLat === 'undefined' || typeof userLong === 'undefined')
  {
    $('#responseNmt').html("Error");

    $("#spinnerNmt").hide();
    
    return
  }
  $('#your-loc-lat').html(userLat)
  $('#your-loc-long').html(userLong)

  $('#responseNmt').html("<br>Latitude: " + userLat.toFixed(7) + ", Longitude: " + userLong.toFixed(7));
  $("#spinnerNmt").hide();
  $("#resultBox").show();
  
  
});


/* NMT */
$('#verifyOwnershipBtn').on('click', function(event) {
  $("#resultBox").hide();
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
     $("#resultBox").show();
  });
});

$('#registerConsentBtn').on('click', function(event) {
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");
  var env = $('#cmsEnv2').find(":selected").val();

  var url;
  var appId;
  if(env == "QA")
  {
    url = getSessionIdUrl
    appId = cmsAppId
  }
  else
  {
    url = getSessionIdUrlProd
    appId = cmsAppIdProd
  }
  var jqxhr = $.post(url, {
      appID: appId
  }
  ,function() {

  })
  .done(function(data) {
    var lineUid = $("#line-uid").val();
    var url;
    var appId;
    if(env == "QA")
    {
      url = registerConsentUrl
      appId = cmsAppId
    }
    else
    {
      url = registerConsentUrlProd
      appId = cmsAppIdProd
    }
    var jqxhr = $.post(url, {
      appKey: appId,
      sessKey: JSON.parse(data).sessKey,
      Src_01:"CRM", 
      Src_02:"95408", 
      Src_03:"PROSPECT",  
      PersonId_01:makeId(15),  
      PersonId_02:"", 
      F_Name:"Sarawut2",  
      L_Name:"Treerat", 
      Phone_No:"0812345678",  
      Email_Addr:"tester64423@gmail.com", 
      Card_Id:"2101000444123",
      Line_Id:lineUid, 
      Consent_Row1:"1", 
      Consent_Row2:"1", 
      Consent_Row3:"1",
      Consent_Row4:"", 
      Consent_Row5:"", 
      Consent_Row6:"", 
      Consent_Row7:"", 
      Consent_Row8:"", 
      Consent_Row9:"",  
      Consent_Row10:"", 
      Consent_Row11:"", 
      Consent_Row12:"", 
      Consent_Row13:"", 
      Consent_Row14:"", 
      Consent_Row15:"", 
      ConsentRegisDate:"20200414080322",  
      File_Path:"", 
      Customer_Type:"1",
      Register_By:"liam"
    }
    ,function() {

    })
    .done(function(data) {
      $("#responseNmt").css("text-align", "left");
      $('#responseNmt').html(JSON.stringify(JSON.parse(data),null,4));
      $("#spinnerNmt").hide();
      $("#spinnerNmt").hide();
      $("#resultBox").show();
    })
    .fail(function() {
      $("#responseNmt").css("text-align", "center");
      $('#responseNmt').html("Error");
      $("#spinnerNmt").hide();
      $("#resultBox").show();
    })
    .always(function() {
       $("#spinnerNmt").hide();
       $("#resultBox").show();
    });
  })
  .fail(function() {
    $("#responseNmt").css("text-align", "center");
    $('#responseNmt').html("Error");
  })
  .always(function() {
     
  });
});


$('#getSessionIdBtn').on('click', function(event) {
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");
  var env = $('#cmsEnv1').find(":selected").val();
  var url;
  var appId;
  if(env == "QA")
  {
    url = getSessionIdUrl
    appId = cmsAppId
  }
  else
  {
    url = getSessionIdUrlProd
    appId = cmsAppIdProd
  }
  var jqxhr = $.post(url, {
      appID: appId
  }
  ,function() {

  })
  .done(function(data) {
    $("#responseNmt").css("text-align", "left");
    $('#responseNmt').html(JSON.stringify(JSON.parse(data),null,4));
    $("#spinnerNmt").hide();
  })
  .fail(function() {
    $("#responseNmt").css("text-align", "center");
    $('#responseNmt').html("Error");
  })
  .always(function() {
     $("#spinnerNmt").hide();
     $("#resultBox").show();
  });
});

/* Admin */
$('#addNewLeadBtn').on('click', function(event) {
  $("#spinnerAdmin").show();
  $('#responseAdmin').html("Loading...");
  $("#responseAdmin").css("text-align", "center");
  $("#spinnerAdmin").css("display", "inline-block");

  var contentType = $('#contentType').find(":selected").val();
  var lineUid = $('#lineUid').find(":selected").val();
  if(contentType == "application/x-www-form-urlencoded")
  {

    var jqxhr = $.post(addNewLeadUrl,
    {
      firstName: "Liam",
      lastName: "Justin",
      phoneNumber: "0892223333",
      emailAddress: "liamjustin999@gmail.com",
      lineUid: lineUid,
      customerType: "prospect",
      bu: "nmt"
    }
    , function() {

    })
    .done(function(data) {
      $("#responseAdmin").css("text-align", "left");
      $('#responseAdmin').html(JSON.stringify(JSON.parse(data), null, 2));
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

/* SMS */
$('#sendSmsBtn').on('click', function(event) {
  $("#resultBox").hide();
  $("#spinnerNmt").show();
  $('#responseNmt').html("Loading...");
  $("#responseNmt").css("text-align", "center");
  $("#spinnerNmt").css("display", "inline-block");
  var url = sendSmsUrl

  $.ajax({
      url: sendSmsUrl,
      type: 'POST',
      headers: {
        "Authorization": "Basic " + btoa(smsUsername + ":" + smsPassword)
      },
      data: {
        msisdn: "0814572475",
        message: "สวัสดีตอนเช้า"
      },
      contentType: "application/x-www-form-urlencoded" + '; charset=utf-8',
      success: function (response) {
        var data = response
        $("#responseNmt").css("text-align", "left");
        $('#responseNmt').html(JSON.stringify(JSON.parse(data), null, 2));
        $("#spinnerNmt").hide();
        $("#resultBox").show();
      },
      error: function () {
        $("#responseNmt").css("text-align", "center");
        $('#responseNmt').html("Error");
        $("#spinnerNmt").hide();
        $("#resultBox").show();
      }
    })
});
      
  