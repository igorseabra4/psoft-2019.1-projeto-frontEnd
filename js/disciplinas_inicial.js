async function get_messages() {
	let response = await fetch('https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses/');
    let data = await response.json();
    
	let $disciplinas = document.getElementById("disciplinas");
    $disciplinas.innerHTML =
    `<table id="disciplinas">
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Nota</th>
        <th>Likes</th>
    </tr>`;

	data.forEach(function (message) {
		$disciplinas.innerHTML +=
        `<tr>
            <td>${message.id}</td>
            <td>${message.name}</td>
            <td>${message.grade}</td>
            <td>${message.likeCount}</td>
        </tr>`;
    });
    $disciplinas.innerHTML += `</table>`;
}

async function init() {
	await get_messages();
}

init();