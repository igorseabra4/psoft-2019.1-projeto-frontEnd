async function create() {
    if (document.getElementById("password").value != document.getElementById("password2").value)
        alert("A confirmação não corresponde à senha digitada.");
    
    let user = {
        firstName: document.getElementById("nome").value,
        lastName :document.getElementById("sobrenome").value,
        email :document.getElementById("email").value,
        password :document.getElementById("password").value
    }
    
    let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/';
    
    try {

        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
              }
        });
    
        if (response.status == 201)
            window.location = 'index.html';
        else{
        let error = await response.json();
        console.log(error);
        }
    }
    catch (ex) { 
        console.log(ex);
    };
}

function createUser(){
    create();
}

document.getElementById("createUserButton").addEventListener("click", createUser, false);