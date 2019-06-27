let urlbase = 'https://projeto-psoft-igor-victor.herokuapp.com/api/v1/courses';

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

async function removeLike(id, userID) {
	let myHeaders = new Headers();
	myHeaders.append('Authentication', 'Bearer ' + localStorage.getItem('token'));
    
    await fetch(urlbase + '/profile/' + id + '/like', {
		method: 'PUT',
        headers: myHeaders,
        body: userID
	});
}