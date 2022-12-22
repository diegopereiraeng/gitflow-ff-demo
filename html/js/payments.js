

function showInvoice(){

    var invoiceElement = $("body").find("#invoice");
    var invoiceDetailElement = $("body").find("#invoiceDetail");
    invoiceElement.attr("style","display: none;");
    invoiceDetailElement.attr("style","display: visibility;");
}

function showPayment(){
    var paymentElement = $("body").find("#payment");
    var invoiceDetailElement = $("body").find("#invoiceDetail");
    invoiceDetailElement.attr("style","display: none;");
    paymentElement.attr("style","display: visibility;");
}

function convertLetterToNumber(str) {
  if ((typeof str === "string" || str instanceof String) && /^[a-zA-Z]+$/.test(str)) {
    str = str.toUpperCase();
    let out = 0,
      len = str.length;
    for (pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  } else {
    return undefined;
  }
}
function sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

function payInvoice(){

    var paymentElement = $("body").find("#payment");
    var paymentProcessElement = $("body").find("#paymentProcess");
    var processText = $("body").find("#processText");
    var paymentCompleteElement = $("body").find("#complete");
    paymentElement.attr("style","display: none;");

    paymentProcessElement.attr("style","display: visibility;");
    processText.text("Authorizing your payment, please wait...");
    sleep(1000)
    //await new Promise(r => setTimeout(r, 1000));

//    var jqxhr = $.ajax( "example.php" )
//      .done(function() {
//        alert( "success" );
//      })
//      .fail(function() {
//        alert( "error" );
//      })
//      .always(function() {
//        alert( "complete" );
//      });
//
//    // Perform other work here ...
//
//    // Set another completion function for the request above
//    jqxhr.always(function() {
//      alert( "second complete" );
//    });
    console.log("Getting Path name:")
    var path = window.location.pathname

    var userPath = path.split('/')[1]
    console.log(path.split('/')[1])
    console.log(window.location.host)
    if((window.location.host).startsWith({ toString: () => "localhost" })){
        userPath = "diegopereiraeng"
    }

    var authAddress = "http://"+userPath+"-payments-validation.harness-demo.site/auth/authorization"
    console.log("Validation Address: ")
    console.log(authAddress)

    paymentProcessElement.attr("style","display: none;")

    var successContentElement = $("body").find("#accepted");
    successContentElement.text("Authorized!");
    paymentCompleteElement.attr("style","display: visibility;");

    sleep(2000)
    paymentCompleteElement.attr("style","display: none;");
    paymentProcessElement.attr("style","display: visibility;")

    var invoiceID = parseInt(Math.floor((Math.random()+convertLetterToNumber(userPath)) * (100+convertLetterToNumber(userPath))));
    var validationID = ""
    var response = $.ajax({
            url: authAddress,
            type: 'POST',
            async: false,
            data: JSON.stringify({
                      "id": invoiceID,
                      "status": "not verified",
                      "validationID": ""
                    }),
            timeout: 0,
            headers: {
               "Content-Type": "application/json"
            },
    });



    if( response.status == 200){
        var processText = $("body").find("#processText");

        processText.text("Processing your payment, please wait...");

        validationID = (JSON.parse(response.responseText)).validationID
        //var successContentElement = $("body").find("#accepted");
        //successContentElement.text(response.responseText);

        console.log(response.responseText);
        validationID = (JSON.parse(response.responseText)).data.validationID
        $.ajax({
            url: 'http://payments.harness-demo.site:8080/v1/payments/process?value=1350&validationPath='+userPath+"&invoiceID="+invoiceID+"&validationID="+validationID ,
            type: 'GET',
            success: function(data){
                var paymentProcessElement = $("body").find("#paymentProcess");
                paymentProcessElement.attr("style","display: none;");
                var paymentCompleteElement = $("body").find("#complete");
                var paymentFailedElement = $("body").find("#failed");

                paymentCompleteElement.attr("style","display: visibility;");

            },
            error: function(data) {
                var paymentProcessElement = $("body").find("#paymentProcess");
                paymentProcessElement.attr("style","display: none;");
                var paymentFailedElement = $("body").find("#failed");
                var errorContentElement = $("body").find("#errorContent");
                var successContentElement = $("body").find("#accepted");
                var errorTitle = $("body").find("#errorTitle")

                if( data.status == 200){
                    var paymentCompleteElement = $("body").find("#complete");
                    paymentCompleteElement.attr("style","display: visibility;");
                    successContentElement.text(data.responseText);

                }
                else{
                    paymentFailedElement.attr("style","display: visibility;");
                    errorContentElement.text(data.responseText);
                    errorTitle.text("Payment declined!")
                }
                console.log(data.responseText);


            }
        });
    }
    else{
        var errorTitle = $("body").find("#errorTitle")
        var paymentFailedElement = $("body").find("#failed");
        var errorContentElement = $("body").find("#errorContent");
        paymentProcessElement.attr("style","display: none;");
        paymentFailedElement.attr("style","display: visibility;");
        errorTitle.text("Authorization Failed")
        if((typeof(response.responseText) === "undefined")){
            errorContentElement.text("Error 500 =(");
        }else{
            errorContentElement.text(response.responseText);
        }

    }




}