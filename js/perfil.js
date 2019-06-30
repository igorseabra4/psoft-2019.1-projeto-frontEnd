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

    if (profile.likedUserIDs.includes(userID)) {
        await removeLike(discID, userID);
        set_button_notliked();
        profile.likeCount--;
    }
    else {
        await putLike(discID, userID);
        set_button_liked();
        profile.likeCount++;
    }

    document.getElementById('likes-disciplina').innerHTML =
    `<p id="likes-disciplina">Curtidas: ${profile.likeCount}</p>`;
}

document.getElementById("meu-like").addEventListener("click", like_click, false);

function set_button_liked() {
    document.getElementById("meu-like").innerHTML = `<a id="meu-like">Remover minha curtida</a>`
}

function set_button_notliked() {
    document.getElementById("meu-like").innerHTML = `<a id="meu-like">Curtir</a>`
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
    })
    .catch(e => console.log(e));
}

// grade functions

async function sendgrade_click() {
    let discID = getVariable('discID');
    let userID = parseInt(localStorage.getItem('userID'));
    let gradeBox = document.getElementById('minha-nota');

    let grade = gradeBox.value;

    if (grade === undefined ||
        grade > 10 || grade < 0)
        alert("Insira uma nota válida entre 0 e 10!");
    else{
        gradeBox.value = grade;
        
        await putGrade(discID, userID, grade);
    
        let profile = await getCourseProfile(discID);
    
        document.getElementById('nota-disciplina').innerHTML =
        `<p id="nota-disciplina">Nota: ${profile.grade}</p>`;
    }
}

document.getElementById("enviar-nota").addEventListener("click", sendgrade_click, false);

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
    })
    .catch(e => console.log(e));
}

// comment functions

async function putComment(discID, userID, comment, parentCommentID, date) {
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
    .then(response => {
        if (response.status != 200) 
            return {success: false, json: response.json()};
        return {success: true};
    })
    .then(resp => {
        if (!resp.success)
            darErro();
    })
    .catch(e => console.log(e));
}

async function removeComment(discID, userID, commentID) {
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
        let userID = parseInt(localStorage.getItem('userID'));

        localStorage.setItem('currentCourseID', discID);
    
        let profile = await getCourseProfile(discID);
        
        if (profile.likedUserIDs.includes(parseInt(localStorage.getItem('userID'))))
            set_button_liked();
        else
            set_button_notliked();

        document.getElementById('nome-disciplina').innerHTML =
            `<h1 id="nome-disciplina">${profile.name}</h1>`;
        document.getElementById('id-disciplina').innerHTML =
            `<p id="id-disciplina">ID: ${profile.id}</p>`;
        document.getElementById('likes-disciplina').innerHTML =
            `<p id="likes-disciplina">Curtidas: ${profile.likeCount}</p>`;
        document.getElementById('nota-disciplina').innerHTML =
            `<p id="likes-disciplina">Nota: ${profile.grade}</p>`;
        
        if (profile.grades[userID] !== undefined)
            document.getElementById('minha-nota').value = profile.grades[userID];
        else
            document.getElementById('minha-nota').value = 0;
        
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