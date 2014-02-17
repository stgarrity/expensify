function sendEvent(element, event) {
    if ("createEvent" in document) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(event, true, true);
	element.dispatchEvent(evt);
    }
    else {
	element.fireEvent("on" + event);
    }
}

var query = document.location.search.substr(1);

// yes, I'm hardcoding this because Expensify's param encoding is absurd
var data = query.split("email%3D");
var email = data[1].replace("%2540", "@");

// now that we have the email, put it in the textbox and let their own logic take over
var signin = document.getElementById('signinemail');
signin.value = email;
sendEvent(signin, 'change');

// this is super ghetto, but no easy way to subscribe to the GApps OpenID "show" event
//  so we'll just wait a second (which seems to be plenty, usually) and then click the button
setTimeout(function () {
	var gapps = document.getElementById('gaOpenID').getElementsByTagName("a")[0];
	sendEvent(gapps, 'click');
    }, 1000);