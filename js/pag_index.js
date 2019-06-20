async function create() {
    let user = {
        email :document.getElementById("email").value,
        password :document.getElementById("password").value
    }
    
	let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';

	let myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
    
	let data = await fetch(url, {
		method: 'POST',
		headers: myHeaders,
		'body': JSON.stringify(user)
	})
    .then(result => result.json());

    data.catch(result => console.log(result));
    
    console.log(data);
}

function createUser(){
    create();
}

document.getElementById("createUserButton").addEventListener("click", createUser, false);