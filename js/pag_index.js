async function login() {
  let user = {
    email :document.getElementById("email").value,
    password :document.getElementById("password").value
  }

  let url = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/auth/login';

  try {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    let jsonResponse = await response.json();
    let localtoken = jsonResponse.token;
    localStorage.setItem('token', localtoken);
  }
  catch (e) {
    console.log(e);
  }
}

document.getElementById("commit").addEventListener("click", login, false);
