function createUser(){
    if (document.getElementById("password").value != document.getElementById("password2").value)
        alert("A confirmação não corresponde à senha digitada.");
    else create({
        firstName: document.getElementById("nome").value,
        lastName :document.getElementById("sobrenome").value,
        email :document.getElementById("email").value,
        password :document.getElementById("password").value
    });
}

async function create(user) {
    let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/';
    
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if (response.status == 201){
            alert("Usuário criado com sucesso.");
            window.location = 'index.html';
        }
        else {
            let error = await response.json();
            alert(error.message);
        }
    })
    .catch(e => console.log(e));
}

document.getElementById("createUserButton").addEventListener("click", createUser, false);