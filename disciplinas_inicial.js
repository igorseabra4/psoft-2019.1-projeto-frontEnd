class MuralDisciplina extends HTMLElement{
    constructor() {
        super();
        this.$shadow = this.attachShadow({"mode": "open"});
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.descricao = this.getAttribute('descricao');
        this.render();
    }

    render() {
        this.$shadow.innerHTML = 
            `<link rel="stylesheet" href="message.css">
            <p class="descricao">${this.id}</p>
            <p class="id">${this.descricao}</p>`;
    }
}

window.customElements.define('disciplina-texto', MuralDisciplina);

const messages = [];

async function get_messages() {
    //let response = await fetch('http://localhost:8080/api/v1/courses/');
    let response = await fetch('disciplinas_local.json');
    let data = await response.json();
    console.log(data);
    data.forEach(function (message) {
        let novo = document.createElement("disciplina-texto");
        novo.setAttribute('id', message.id);
        novo.setAttribute('descricao', message.descricao);
        messages.push(novo);
    });
    console.log(messages);
}

function render() {
    let $disciplinas = document.getElementById("disciplinas");
    $disciplinas.innerHTML = '';
    messages.forEach(function (message) {
        $disciplinas.appendChild(message);
    });
    console.log($disciplinas);
}

async function init() {
    await get_messages();
    render();
}

init();