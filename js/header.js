let userName = localStorage.getItem("userName");

let buttonHtml = `<button id="botao-logout" onclick="logout()" class="botao-comum">Logout</button>`

if (userName !== null && userName !== undefined)
    document.getElementById("username-header").innerHTML =
    `<span id="username-span">Usuário: ${userName}</span>
    ${buttonHtml}`;
else
    document.getElementById("username-header").textContent = '';

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    window.location = 'index.html';
}

document.getElementById("botao-logout").addEventListener("click",logout,false);