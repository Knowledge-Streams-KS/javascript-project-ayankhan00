/** @format */

window.onload = function () {
	let mydata = localStorage.getItem('mydata');
	if (mydata) {
		let movied = document.getElementById('response-title');
		movied.innerHTML = mydata;
	}
	sessionStorage.clear();
};
window.onbeforeunload = function () {
	let movied = document.getElementById('response-title').innerHTML;
	localStorage.setItem('mydata', movied);
};
window.setTimeout(() => {
	var b = document.getElementById('myblock');
	b.setAttribute('class', 'hide');
}, 2000);
const controller = new AbortController();
const { signal } = controller;

async function getdata() {
	let movied = document.getElementById('response-title');
	movied.innerHTML = '';

	let name = document.getElementById('title').value;
	let year = document.getElementById('year').value;

	if (!name) {
		return;
	}

	const x = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=9b061cb2`, {
		signal,
	});
	let data = await x.json();
	let arrdata = data['Search'];
	if (year) {
		arrdata = arrdata.filter((m) => year <= m['Year']);
	}
	arrdata.forEach((element) => {
		movied.insertAdjacentHTML(
			'afterbegin',
			`<li class="cards_item">
                    <div class="card">
                        <div class="card_image"><img src="${element['Poster']}"></div>
                        <div class="card_content">
                            <h2 class="card_title">${element['Title']}</h2>
                            <p class="card_text">${element['Year']}</p>
                        </div>
                    </div>
                </li>`,
		);
	});
}

const tb = document.getElementById('search-by-title-button');
tb.addEventListener('click', getdata);
const yb = document.getElementById('year');
yb.addEventListener('keyup', getdata);
