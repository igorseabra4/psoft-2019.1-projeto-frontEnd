async function create() {
    if (document.getElementById("password").value != document.getElementById("password2").value)
        alert("A confirmação não corresponde à senha digitada.");
    
    let user = {
        firstName: document.getElementById("nome").value,
        lastName :document.getElementById("sobrenome").value,
        email :document.getElementById("email").value,
        password :document.getElementById("password").value
    }
    console.log(user);
    
	//let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/';
    let url = 'localhost:8080/api/v1/auth/';

	let myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
    
	let data = await fetch(url, {
		method: 'POST',
		headers: myHeaders,
		'body': JSON.stringify(user)
	})
    .then(result => result.json())
    .catch(result => console.log(result));
    
    console.log(data);
}

function createUser(){
    create();
}

document.getElementById("createUserButton").addEventListener("click", createUser, false);