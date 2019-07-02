let userName = localStorage.getItem("userName");

if (userName !== null && userName !== undefined)
    document.getElementById("username-header").textContent = `Usuário: ${userName}`;
else
    document.getElementById("username-header").textContent = '';