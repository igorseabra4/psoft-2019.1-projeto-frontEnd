let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses';

async function get_disciplinas() {
    await fetch(urlbase)
    .then(response => response.json())
    .then(data => preenche_tabela(data));
}

// funcao usada para pesquisar as disciplinas digitando seu nome ou parte dele na barra de busca
async function get_disciplinas_substring() {
    let str = document.getElementById("txtBusca").value;
    await fetch(urlbase + '/substring?str=' + str)
    .then(response => response.json())
    .then(data => preenche_tabela(data));
}

async function get_disciplinas_ranking() {
    let response = await fetch(urlbase + '/rank', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    })

    if (response.status != 200){
        alert("Houve um erro ao fazer a requisição. Por favor, faça login e tente novamente.");
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userID');
            window.location = 'index.html';
    }
    else {
        let json = await response.json();
        preenche_tabela(json);
    }
}

function preenche_tabela(disciplinas){
    let $disciplinas = document.getElementById("disciplinas");
    $disciplinas.innerHTML =
    `<table id="table">
    <div class="header-row row">
        <span class="cell primary">ID</span>
        <span class="cell cell-name">Nome</span> 
    </div>`;
	disciplinas.forEach(disc => {
		$disciplinas.innerHTML += 
        `<div class="row">
            <span class="cell" data-label="ID">${disc.id}</span>
            <span class="cell cell-name" data-label="NOME"><a href="perfil.html?discID=${disc.id}">${disc.name}</a></span>
        </div>`;
    });
    $disciplinas.innerHTML += `</table>`;
}

get_disciplinas();