let userName = localStorage.getItem("userName");

if (userName !== null && userName !== undefined)
    document.getElementById("username-header").innerHTML =
`<div id="username-header">Usuário: ${userName}</div>`;
else
    document.getElementById("username-header").innerHTML =
`<div id="username-header"></div>`;