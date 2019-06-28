let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses/profile/';

function getVariable(variable)
{
    let variables = window.location.search.substring(1).split("&");
    
    for (let i = 0; i < variables.length; i++) {
        let arg = variables[i].split("=");
        
        if (arg[0] == variable)
            return arg[1];
    }
}

function darErro(){
    alert("Houve um erro ao fazer a requisição. Por favor, faça login e tente novamente.");
    
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    window.location = 'index.html';
}

async function getCourseProfile(discID) {
    let data;

    let response = await fetch(urlbase + discID, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    
    let json = await response.json();
    
    if (response.status == 200)
        data = json;
    else
    {
        darErro();
        data = undefined;
    }
    
    return data;
}

// like functions

async function like_click() {
    let discID = getVariable('discID');
    let userID = parseInt(localStorage.getItem('userID'));
    let profile = await getCourseProfile(discID);

    let likeCount = profile.likeCount;
    if (profile.likedUserIDs.includes(userID)) {
        console.log('killlike');
        removeLike(discID, userID);
        set_button_notliked();
        likeCount--;
    }
    else {
        console.log('putlike');
        putLike(discID, userID);
        set_button_liked();
        likeCount++;
    }

    document.getElementById("likecounter").innerHTML = `<h1 id="likecounter">Número de likes: ${likeCount}</h1>`;
}

document.getElementById("meulike").addEventListener("click", like_click, false);

function set_button_liked() {
    document.getElementById("meulike").innerHTML = `<button id="meulike">Clique para remover like</button>`
}

function set_button_notliked() {
    document.getElementById("meulike").innerHTML = `<button id="meulike">Clique para dar like</button>`
}

async function putLike(discID, userID) {
    await fetch(urlbase + discID + '/like', {
        method:'PUT',
        body: JSON.stringify(userID),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.status != 200) 
            return {success: false, json: response.json()};
        return {success: true};
    })
    .then(resp => {
        if (!resp.success)
            darErro();
            //alert(resp.json.message);
    })
    .catch(e => console.log(e));
}

async function removeLike(discID, userID) {
    await fetch(urlbase + discID + '/like', {
		method: 'DELETE',
        body: JSON.stringify(userID),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.status != 200) 
            return {success: false, json: response.json()};
        return {success: true};
    })
    .then(resp => {
        if (!resp.success)
            darErro();
            //alert(resp.json.message);
    })
    .catch(e => console.log(e));
}


// grade functions

async function putGrade(discID, userID, grade) {
    await fetch(urlbase + discID + '/grade', {
        method:'PUT',
        body: JSON.stringify({
            'userID': userID,
            'grade': grade
        }),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.status != 200) 
            return {success: false, json: response.json()};
        return {success: true};
    })
    .then(resp => {
        if (!resp.success)
            darErro();
            //alert(resp.json.message);
    })
    .catch(e => console.log(e));
}

// comment functions

async function putComment(discID, userID, comment, parentCommentID, date) {
    let data;
    await fetch(urlbase + discID + '/comment', {
		method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            'userID': userID,
            'comment': comment,
            'parentCommentID': parentCommentID,
            'date': date
        })
	})
    .then(result => data = treatResult(result))
    .catch(e => console.log(e));
    
    return data;
}

async function removeComment(discID, userID, commentID) {
    let data;
    await fetch(urlbase + discID + '/like', {
		method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            'userID': userID,
            'commentID': commentID
        })
	})
    .then(result => data = treatResult(result))
    .catch(e => console.log(e));
    
    return data;
}

async function usersWithId(ids) {
    let data;
    await fetch('https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/withID/', {
        body: JSON.stringify(ids)
    })
    .then(response => response.json())
    .then(result => data = treatResult(result))
    .catch(e => console.log(e));
    
    return data;
}


// main functions

async function init(){
    try {
        let discID = getVariable('discID');

        localStorage.setItem('currentCourseID', discID);
    
        let profile = await getCourseProfile(discID);
        
        let $perfil = document.getElementById("disciplina");

        if (profile.likedUserIDs.includes(parseInt(localStorage.getItem('userID'))))
            set_button_liked();
        else
            set_button_notliked();

        $perfil.innerHTML = `<div id="disciplina">`;
        $perfil.innerHTML += `<h1>ID: ${profile.id}</h1>`;
        $perfil.innerHTML += `<h1>Nome: ${profile.name}</h1>`;
        $perfil.innerHTML += `<h1 id="likecounter">Número de likes: ${profile.likeCount}</h1>`;
        $perfil.innerHTML += `<h1>Nota: ${profile.grade}</h1>`;
        $perfil.innerHTML += `</div>`;

        let $comments = document.getElementById("comentarios");

        $comments.innerHTML = `<div id="comentarios">`;
        profile.comments.forEach(element => {
            $comments.innerHTML += `<h1>Comentário</h1>`;
        });
        $comments.innerHTML += `</div>`;
        
        // o profile retornado acima é um objeto com os atributos:
        // id (discID)
        // name (nome da disciplina)
        // likedUserIDs (IDs de usuários que deram like)
        // likeCount (total de likes)
        // grades (hashmap de ID de usuário pra nota)
        // grade (média das notas)
        // comments (lista de comentários, cada um é um objeto também)
        
        // o objeto comentário tem os atributos:
        // ID (id único do comentário, gerado pelo back)
        // userID (id do usuário que fez o comentário)
        // comment (comentário em string, vazio em deletados)
        // parentCommentID (id do comentário pai; -1 se não tem pai)
        // date (data do comentário)
        // deleted (comentário foi deletado)
    }
    catch (e) {
        // fazer alguma coisa com o erro
        console.log(e);
    }
}

init();