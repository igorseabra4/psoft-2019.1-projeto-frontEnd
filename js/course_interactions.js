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

function init(){
    try {
        let discID = getVariable(discID);

        localStorage.setItem('currentCourseID', discID);
    
        let courseProfile = getCourseProfile(discID);

        // prencher html da página aqui!

        // o courseProfile retornado acima é um objeto com os atributos:
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
    }
}

init();

async function getCourseProfile(discID) {
    return await fetch(urlbase + discID, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
	})
    .then(result => result.json())
    .catch(e => console.log(e));
}

async function putLike(discID, userID) {
    await fetch(urlbase + discID + '/like', {
		method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: userID
    })
    .catch(e => console.log(e));
}

async function removeLike(discID, userID) {
    await fetch(urlbase + discID + '/like', {
		method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: userID
	})
    .catch(e => console.log(e));
}

async function putGrade(discID, userID, grade) {
    await fetch(urlbase + discID + '/grade', {
		method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: {
            'userID': userID,
            'grade': grade
        }
	})
    .catch(e => console.log(e));
}

async function putComment(discID, userID, comment, parentCommentID, date) {
    await fetch(urlbase + discID + '/comment', {
		method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: {
            'userID': userID,
            'comment': comment,
            'parentCommentID': parentCommentID,
            'date': date
        }
	})
    .catch(e => console.log(e));
}

async function removeComment(discID, userID, commentID) {
    await fetch(urlbase + discID + '/like', {
		method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: {
            'userID': userID,
            'commentID': commentID
        }
	})
    .catch(e => console.log(e));
}