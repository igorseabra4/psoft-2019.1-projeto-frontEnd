function login() {
    sendLogin({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    });
}

async function sendLogin(user){
    let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';
    
    await fetch(url, {
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8'
        }
    })
    .then(response => response.json())
    .then(json => {
        if (response.status == 200) {
            alert("Login realizado com sucesso.");
            window.location = 'index.html';
        } else {
            localStorage.removeItem('token');
            alert(json.message);
        }
    })
    .catch(e => console.log(e));
}

document.getElementById("commit").addEventListener("click",login,false);
    