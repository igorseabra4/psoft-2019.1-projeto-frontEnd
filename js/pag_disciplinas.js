async function get_disciplinas() {
    await fetch('https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses/')
    .then(response => response.json())
    .then(data => preenche_tabela(data));
}

async function get_disciplinas_substring(str) {
    await fetch('https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses/substring',{
        body: str
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
        <th>Nota</th>
        <th>Likes</th>
    </tr>`;
	disciplinas.forEach(disc => {
		$disciplinas.innerHTML +=
        `<tr>
            <td>${disc.id}</td>
            <td>${disc.name}</td>
            <td>${disc.grade}</td>
            <td>${disc.likeCount}</td>
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