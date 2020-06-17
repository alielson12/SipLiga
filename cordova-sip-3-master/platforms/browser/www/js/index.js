
var sipManager = {
	register: function () {
		
		cordova.plugins.sip.login('720302', '12345678', 'voip.vn3anjo.com.br', function (e) {
			
			if (e == 'RegistrationSuccess') {
				alert("Connected")
				sipManager.listen();

			} else {
				alert("Registration Failed!");
			}

		}, function (e) { console.log(e) })
	},
	call: function () {
		alert("ligando...")
		cordova.plugins.sip.call('720301', '12345678','voip.vn3anjo.com.br', sipManager.events, sipManager.events)
		
	},
	listen: function () {
		cordova.plugins.sip.listenCall(sipManager.events, sipManager.events);
		alert("pronto para receber ligacoes")
	},
	hangup: function () {
		cordova.plugins.sip.hangup(function (e) { console.log(e) }, function (e) { console.log(e) })
	},
	events: function (e) {
		console.log(e);
		if (e == 'Incoming') {
			var r = confirm("Recebendo Chamada");
			if (r == true) {
				cordova.plugins.sip.accept(true, sipManager.events, sipManager.events);
			} else {

			}
		}
		if (e == 'Connected') {
			alert("Connected!");
			sipManager.listen();
		}
		if (e == 'Error') {
			alert("Call Error!");
			sipManager.listen();
		}
		if (e == 'End') {
			alert("Call End!");
			sipManager.listen();
		}


	}
}

const successCallback = () => {
	console.log("listen");
}
const errrooor = () => {
	console.log("listen");
}

function onload() {
	document.addEventListener("deviceready", onDeviceReady, false);
}


document.getElementById("list").addEventListener("click",()=> {
	alert('as');
	sipManager.register()
	console.log("logis")
	}
);




document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // sipManager.register();
}

var number = '';
const click = (digit) => {
	number += digit;
	document.querySelector('#inputnumbers').innerHTML = number;

}

const deleteDigit = () => {
	number = number.substring(0, number.length - 1)

	document.querySelector('#inputnumbers').innerHTML = number;
}

const handleCallButton = () => {
	alert('ligar para:' + number);
	sipManager.register();
	const options = {
		method: 'get',
		data: { 
			
		 },
	};

	cordova.plugin.http.sendRequest('https://jsonplaceholder.typicode.com/todos/1', options, function(response) {
  // prints 200
  console.log(response);
	}, function(response) {
		// prints 403
		console.log(response);
	
		//prints Permission denied
		console.log(response.error);
	});


}

document.querySelector("#button1").addEventListener("click", ()=>{click('1')})
document.querySelector("#button2").addEventListener("click", ()=>{click('2')})
document.querySelector("#button3").addEventListener("click", ()=>{click('3')})
document.querySelector("#button4").addEventListener("click", ()=>{click('4')})
document.querySelector("#button5").addEventListener("click", ()=>{click('5')})
document.querySelector("#button6").addEventListener("click", ()=>{click('6')})
document.querySelector("#button7").addEventListener("click", ()=>{click('7')})
document.querySelector("#button8").addEventListener("click", ()=>{click('8')})
document.querySelector("#button9").addEventListener("click", ()=>{click('9')})
document.querySelector("#buttonHashtag").addEventListener("click", ()=>{click('#')})
document.querySelector("#button0").addEventListener("click", ()=>{click('0')})
document.querySelector("#buttonAsterisk").addEventListener("click", ()=>{click('*')})
document.querySelector("#back").addEventListener("click", ()=>{deleteDigit()})

document.querySelector("#callbutton").addEventListener("click", ()=>{handleCallButton()})
