

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


function payInvoice(){

	var paymentElement = $("body").find("#payment");
	var paymentProcessElement = $("body").find("#paymentProcess");

	paymentElement.attr("style","display: none;");

	paymentProcessElement.attr("style","display: visibility;");

//	var jqxhr = $.ajax( "example.php" )
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

	$.ajax({
        url: 'http://34.67.168.73:8082/v1/payments/process?value=1350',
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


			if( data.status == 200){
				var paymentCompleteElement = $("body").find("#complete");
                paymentCompleteElement.attr("style","display: visibility;");
                successContentElement.text(data.responseText);

			}
			else{
				paymentFailedElement.attr("style","display: visibility;");
				errorContentElement.text(data.responseText);
			}
			console.log(data.responseText);


        }
    });



}