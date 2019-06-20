async function login() {
    let user = {
        email :document.getElementById("email").value,
        password :document.getElementById("password").value
    }
    
	let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';

	let myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');
    
    let lresult;

    let localtoken = await fetch(url, {
		method: 'POST',
		headers: myHeaders,
		'body': JSON.stringify(user)
	})
    .then(result => {
        lresult = result.json().token; 
        return lresult;
    })
    .catch(response => alert(response));
    
    localStorage.setItem('token', localtoken);
}

document.getElementById("commit").addEventListener("click", login, false);