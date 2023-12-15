window.onload = ()=>{
	//75963a23-73d5-4c8e-9c8b-be18ce4fc310
	setInterval(()=>{
		getLogs("onload");
		document.getElementById("logs").scrollTop = document.getElementById("logs").scrollHeight 
	}, 1000);


}



async function stop(){
	const token = document.getElementById("token").value.toString().replaceAll("/","");

	let status = await check("stop");

	if(status != "200"){
		alert("O servidor já está parado.");
	}else{
		const response = await fetch(`http://140.238.179.233:3000/stopServer/${token?token:null}`);
		const status = await response;
		alert("Parando o servidor, favor aguardar alguns minutos.");
	}

	return 'Parando Servidor';
}

async function start(){
	const token = document.getElementById("token").value.toString().replaceAll("/","");

	let status = await check("start");
	console.log("start status",status)
	if(status == "200"){
		alert("O servidor já está em execução.");
	}else{
		const response = await fetch(`http://140.238.179.233:3000/startServer/${token?token:null}`);
		const status = await response;
		alert("Iniciando servidor, favor aguardar alguns minutos.");
	}

	return 'Iniciando Servidor';
}

async function check(startedAt){

	const token = document.getElementById("token").value.toString().replaceAll("/","");

	const response = await fetch(`http://140.238.179.233:3000/serverRunning/${token?token:null}`);
	const status = await response.json();

	if(!token){
		!startedAt?alert("Você precisa inserir o token."):console.log("Você precisa inserir o token.");
	}else if(status.message == "Sai daqui"){
		!startedAt?alert("O token é inválido."):console.log("O token é inválido.");
	}else{
		!startedAt?alert(status&&status=="200"?"O Server está em execução normalmente!":"O Server não está em execução."):console.log(status&&status=="200"?"O Server está em execução normalmente!":"O Server não está em execução.");
	}
	console.log(status.message || status)
	return status.message || status;
}

async function getLogs(){
	const token = document.getElementById("token").value.toString().replaceAll("/","");

	if(!token){
		console.log("Você precisa inserir o token.");
		document.getElementById("logs").value = "Você precisa inserir o token.";
	}else{
		const response = await fetch(`http://140.238.179.233:3000/getLogs/${token?token:null}`);
		const logs = await response.text();
		document.getElementById("logs").value = logs;
		return logs;
	}
}

async function sendCommand(){
	const token = document.getElementById("token").value.toString().replaceAll("/","");
	const comando = document.getElementById("command").value.toString().replaceAll("/","");


	if(!token){
		alert("Você precisa inserir o token.");
		document.getElementById("logs").value = "Você precisa inserir o token.";
	}else if(!comando){
		alert("Você precisa inserir algum comando.");
	}else{
		console.log("enviar comando ativado")
		const response = await fetch(`http://140.238.179.233:3000/sendCommand/${token?token:null}/${comando}`);
		const resComando = await response.text();
		alert(resComando);
		return resComando;
	}
}