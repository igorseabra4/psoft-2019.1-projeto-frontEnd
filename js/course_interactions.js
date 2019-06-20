let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses';

async function getAll() {
    return await fetch(urlbase)
    .then(result => result.json())
    .catch(response => alert(response));
}
async function getAllRank() {
    return await fetch(urlbase + '/rank')
    .then(result => result.json())
    .catch(response => alert(response));
}

async function getAllSubstring(substring) {
    return await fetch(urlbase + '/substring', {
        body: substring
	})
    .then(result => result.json())
    .catch(response => alert(response));
}

async function getCourseProfile(id) {
	let myHeaders = new Headers();
	myHeaders.append('Authentication', 'Bearer ' + localStorage.getItem('token'));
    
    return await fetch(urlbase + '/profile/' + id, {
		method: 'GET',
        headers: myHeaders,
	})
    .then(result => result.json())
    .catch(response => alert(response));
}

async function putLike(id, userID) {
	let myHeaders = new Headers();
	myHeaders.append('Authentication', 'Bearer ' + localStorage.getItem('token'));
    
    await fetch(urlbase + '/profile/' + id + '/like', {
		method: 'PUT',
        headers: myHeaders,
        body: userID
	});
}