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

// essa funcao provavelmente vai sair daqui, ja que a lista que ela retorna eh diferente e precisa de auth
async function get_disciplinas_ranking() {
    await fetch(urlbase + '/rank', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then(response => response.json())
    .then(data => preenche_tabela(data));
}

function preenche_tabela(disciplinas){
    let $disciplinas = document.getElementById("disciplinas");
    $disciplinas.innerHTML =
    `<table id="table">
    <div class="header-row row">
        <span class="cell primary">ID</span>
        <span class="cell">NOME</span> 
    </div>`;
	disciplinas.forEach(disc => {
		$disciplinas.innerHTML += 
        `<div class="row">
            <span class="cell primary" data-label="ID">${disc.id}</span>
            <span class="cell" data-label="NOME"><a href="perfil.html?discID=${disc.id}">${disc.name}</a></span>
        </div>`;
    });
    $disciplinas.innerHTML += `</table>`;
}

function init_substring(substring) {
    if (substring == '')
        get_disciplinas();
    else
	    get_disciplinas_substring(substring);
}

get_disciplinas();