let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses/profile/';
//let urlbase = 'https://localhost:8080/api/v1/courses/profile/';

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
        darErro();
    
    return data;
}

async function getCourseComments(discID) {
    let data;

    let response = await fetch(urlbase + discID + '/comments', {
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

document.getElementById("meu-like").addEventListener("click", like_click);

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

document.getElementById("enviar-nota").addEventListener("click", sendgrade_click);

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
            darErro();
    })
    .catch(e => console.log(e));
}

// comment functions

async function sendcomment_click() {
    let discID = getVariable('discID');
    let userID = localStorage.getItem('userID');
    let comment = document.getElementById('comment-area').value;
    let userName = await userNameFromID(userID);
    
    await putComment(discID, userID, userName, comment, currentParent);

    cancelar_resposta();

    init_comments(userID);
}

function cancelar_resposta(){
    currentParent = -1;
    document.getElementById("em-resposta-a").innerHTML = `<h5 id="em-resposta-a"></h5>`
}

document.getElementById("enviar-comentario").addEventListener("click", sendcomment_click);

async function putComment(discID, userID, userName, comment, parentCommentID) {
    await fetch(urlbase + discID + '/comment', {
        method:'PUT',
        body: JSON.stringify({
            'userID': userID,
            'userName': userName,
            'comment': comment,
            'parentCommentID': parentCommentID
        }),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
	})
    .then(response => {
        if (response.status != 200)
            darErro();
    })
    .catch(e => console.log(e));
}

async function deletecomment_click(id) {
    let discID = getVariable('discID');
    let userID = localStorage.getItem('userID');
    
    await removeComment(discID, userID, id);
    
    let profile = await getCourseProfile(discID);
    
    if (profile.commentsIDs.length > 0)
        init_comments(userID);
    else
        zero_comments();
}

async function removeComment(discID, userID, commentID) {
    await fetch(urlbase + discID + '/comment', {
		method: 'DELETE',
        body: JSON.stringify({
            'userID': userID,
            'commentID': commentID
        }),
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
	})
    .then(response => {
        if (response.status != 200)
            darErro();
    })
    .catch(e => console.log(e));
}

let currentParent = -1;

async function respondercomment_click(id, title){
    currentParent = id;
    document.getElementById("em-resposta-a").innerHTML =
    `<h5 id="em-resposta-a">Em resposta a: ${title}</h5>
    <a class="botao-comum cancel-comment" id="botao-cancelar-resposta">Cancelar Resposta</a>`
    document.getElementById("em-resposta-a").scrollIntoView();
    document.getElementById("botao-cancelar-resposta").addEventListener("click", function(){
        cancelar_resposta();
    })
}

// main functions

async function init(){
    try {
        let discID = getVariable('discID');
        let userID = parseInt(localStorage.getItem('userID'));

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
        
        init_comments(userID);
        
        // o profile retornado acima é um objeto com os atributos:
        // id (discID)
        // name (nome da disciplina)
        // likedUserIDs (IDs de usuários que deram like)
        // likeCount (total de likes)
        // grades (hashmap de ID de usuário pra nota)
        // grade (média das notas)
        // commentsIDs (lista de ids de comentários)
    }
    catch (e) {
        // fazer alguma coisa com o erro
        console.log(e);
    }
}

async function init_comments(userID) {
    // o objeto comentário tem os atributos:
    // ID (id único do comentário, gerado pelo back)
    // userID (id do usuário que fez o comentário)
    // userName (nome do usuário que fez o comentário)
    // comment (comentário em string, vazio em deletados)
    // parentCommentID (id do comentário pai; -1 se não tem pai)
    // date (data do comentário)
    // dateString (data do comentário)
    // deleted (comentário foi deletado)
    
    let comments = await getCourseComments(getVariable('discID'));
    let qtd = 0;

    let $comments = document.getElementById("comentarios");
    $comments.innerHTML =
    `<div id="comentarios">`;
	comments.forEach(comm => {
        if (!comm.deleted && comm.parentCommentID == -1) {
            $comments.innerHTML += 
            `<div class="row">
                <h4>${comm.userName} - ${format_date(comm.date)}</h4>
                <p>${comm.comment}</p>`;
            
            $comments.innerHTML += `<a class="botao-comum botao-comment" id="botao-responder-${comm.id}"">Adicionar resposta</a>`;

            if (comm.userID == userID || userID == 15)
                $comments.innerHTML += `<a class="botao-comum botao-comment" style="margin-right: 0; margin-left: 28%"id="botao-deletar-${comm.id}"">Apagar comentário</a>`;

            $comments.innerHTML += `<hr>`;

            comments.forEach(comm2 => {
                if (!comm2.deleted && comm2.parentCommentID == comm.id) {
                    $comments.innerHTML += 
                    `<div class="row" style="margin-left: 50px;">
                    <h4>${comm2.userName} - ${format_date(comm2.date)}</h4>
                    <h5>Em resposta a ${comm.userName} - ${format_date(comm.date)}</h5>
                    <p>${comm2.comment}</p>`;
                    
                    if (comm2.userID == userID || userID == 15)
                        $comments.innerHTML += `<div style="display:flex;"><a class="botao-comum botao-comment" style="margin-right: 0"id="botao-deletar-${comm2.id}"">Apagar comentário</a>`;
            
                    $comments.innerHTML += `</div>`;
                    $comments.innerHTML += `<hr>`;
                    qtd++;
                }
            });
            
            $comments.innerHTML += `</div>`;
            qtd++;
        }
    });
    $comments.innerHTML += `</div>`;

	comments.forEach(comm => {
        if (!comm.deleted)
        {
            if (comm.parentCommentID == -1){
                let botaoResponder = document.getElementById(`botao-responder-${comm.id}`);
                
                if (botaoResponder !== null)
                botaoResponder.addEventListener("click", function(){
                    respondercomment_click(comm.id, `${comm.userName} - ${format_date(comm.date)}`);
                });
            }

            if (comm.userID == userID || userID == 15) {
                let botaoDeletar = document.getElementById(`botao-deletar-${comm.id}`);

                if (botaoDeletar !== null)
                botaoDeletar.addEventListener("click", function(){
                    deletecomment_click(comm.id);
                });
            }
        }
    });
    
    if (qtd == 0)
        $comments.innerHTML =`<div id="comentarios"><h4>Nenhum comentário para esta disciplina</h4></div>`;
}

async function userNameFromID(id) {
    try{
        let response = await fetch('https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/withID?id=' + id);
        
        if (response.status != 200)
            darErro();
        else {
            return response.text();
        }
    }catch (e){
        console.log(e);
    }
}

function format_date(date) {
    let dateTime = new Date(date);
    return pad(dateTime.getDate(), 2) + "/" + pad(dateTime.getMonth() + 1, 2) + "/" + dateTime.getFullYear() + " às " +
        pad(dateTime.getHours(), 2) + ":" + pad(dateTime.getMinutes(), 2) + ":" + pad(dateTime.getSeconds(), 2);
}

// por que javascript nao tem essa funcao?
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

init();