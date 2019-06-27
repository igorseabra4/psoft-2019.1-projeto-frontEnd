let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses';

async function get_disciplinas() {
    await fetch(urlbase)
    .then(response => response.json())
    .then(data => preenche_tabela(data));
}

async function get_disciplinas_substring(str) {
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
    `<table id="disciplinas">
    <tr>
        <th>ID</th>
        <th>Nome</th>
    </tr>`;
	disciplinas.forEach(disc => {
		$disciplinas.innerHTML += 
        `<tr>
            <td>${disc.id}</td>
            <td>${disc.name}</td>
        </tr>`;
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