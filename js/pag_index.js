async function login() {
	let user = {
		email :document.getElementById("email").value,
		password :document.getElementById("password").value
	}
	
	let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';
	
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json; charset=utf-8'
		}
	})
	.then(result => {
		let localtoken = result.json().token;
		alert(localtoken);
		localStorage.setItem('token', localtoken);
	})
	.catch(response => alert(response));
}

document.getElementById("commit").addEventListener("click", login, false);
