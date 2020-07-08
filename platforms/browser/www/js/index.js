var privateId;
var password;
var realm;
var msg;
var aux = true;

var sipManager = {
	register: function () {
		cordova.plugins.sip.login(privateId, password, 'voip.vn3anjo.com.br', function (e) {
			if (e == 'RegistrationSuccess') {
				msg.innerHTML = "Conectado";
				sipManager.listen();

			} else {
				msg.innerHTML = "Registration Failed!";
			}

		}, function (e) { console.log(e) })
	},
	call: function () {
		cordova.plugins.sip.call('720301', '12345678','voip.vn3anjo.com.br', sipManager.events, sipManager.events)
		
	},
	listen: function () {
		cordova.plugins.sip.listenCall(sipManager.events, sipManager.events);
		msg.innerHTML = "Conectado e Pronto Para receber Ligações" ;
	},
	hangup: function () {	
		cordova.plugins.sip.hangup(function (e) { console.log(e) }, function (e) { console.log(e) })
	},
	events: function (e) {
		console.log(e);
		if (e == 'Incoming') {
			var r = true;
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
			// alert("Call End!");
			msg.innerHTML = "Chamada Finalizada";
			sipManager.listen();
		}


	}
}
const logar = () => {
	login('203', '203', '192.168.1.111:5060', function (e) {

		if (e == 'RegistrationSuccess') {
			console.log(e);
			listen();
		} else {
			alert("Registration Failed!");
		}

	}, function (e) { console.log(e) })

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

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	//device is ready
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

const offButton = () => {
	sipManager.hangup();
	// msg.innerHTML = "Chamada Finalizada";
}	


const vivaVoz = () =>{
	 
    if (aux ==true){
		AudioToggle.setAudioMode(AudioToggle.SPEAKER);
		aux = false;
		alert('viva voz ligado')
	}
     else{
		AudioToggle.setAudioMode(AudioToggle.EARPIECE);
		aux = true;
		alert('viva voz desligado')
	 }
	
}


const handleCallButton = () => {
	msg.innerHTML = "Conectando..";
	const options = {
		method: 'get',
		data: {
		 },
	};

	cordova.plugin.http.sendRequest('https://teste.vn3anjo.com.br/vn3/api/faz_ligacao.php', options, function(response) {
	
	const data = JSON.parse(response.data);

	password = data.password;
	realm = data.realm;
	privateId = data.priviateid; 
	
	sipManager.register();
	}, function(response) {
		// prints 403
		console.log(response);
	
		//prints Permission denied

		console.log(response.error);
	});


}
msg = document.querySelector("#spanid")
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
document.querySelector("#viva").addEventListener("click", ()=>{vivaVoz()})
document.querySelector("#yuri").addEventListener("click", ()=>{offButton()})

document.querySelector("#button0").addEventListener("click", ()=>{click('0')})
document.querySelector("#buttonAsterisk").addEventListener("click", ()=>{click('*')})
document.querySelector("#back").addEventListener("click", ()=>{deleteDigit()})
document.querySelector("#callbutton").addEventListener("click", ()=>{handleCallButton()})
document.querySelector("#backbutton").addEventListener("click", ()=>{testeButton()})



