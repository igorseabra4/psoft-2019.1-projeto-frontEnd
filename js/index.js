function login() {
    sendLogin({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    });
}

async function sendLogin(user){
    let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';
    
    try {
        let response = await fetch(url, {
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=utf-8'
            }
        });
        
        let json = await response.json();

        if (response.status == 200) {
            localStorage.setItem('token', json.token);
            localStorage.setItem('userID', json.userID);
            window.location = 'disciplinas.html';
        }
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            alert(json.message);
        }
    }
    catch(e) { 
        console.log(e);
    }
}

document.getElementById("commit").addEventListener("click",login,false);