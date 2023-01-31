/** @format */
// search-by-title-reset
window.onload = function () {
	let mydata = localStorage.getItem('mydata');
	let mydata2 = localStorage.getItem('myobject');
	if (mydata) {
		// movied.innerHTML = mydata;
		displayDiv(JSON.parse(mydata2));
	} else if (mydata2) {
		displayDiv(mydata2);
	}
	sessionStorage.clear();
};
window.onbeforeunload = function () {
	let movied = document.getElementById('response-title').innerHTML;
	const myJSON = JSON.stringify(arrdata);
	console.log(myJSON);
	localStorage.setItem('mydata', movied);
	localStorage.setItem('myobject', myJSON);
};
window.setTimeout(() => {
	var b = document.getElementById('myblock');
	b.setAttribute('class', 'hide');
}, 1000);
const controller = new AbortController();
const { signal } = controller;

async function getdata() {
	let movied = document.getElementById('response-title');
	movied.innerHTML = '';

	let title = document.getElementById('title').value;
	let year = document.getElementById('year').value;

	if (!title) {
		return;
	}

	const x = await fetch(
		`http://www.omdbapi.com/?s=${title}&apikey=4714ea0f`,
		{
			signal,
		},
	);
	let data = await x.json();
	arrdata = data['Search'];
	if (year) {
		arrdata = arrdata.filter((m) => year <= m['Year']);
	}
	displayDiv(arrdata);
	// console.log(arrdata);
	// arrdata.forEach((element) => {
	// 	movied.insertAdjacentHTML(
	// 		'afterbegin',
	// 		`<li class="cards_item">
	//                 <div class="card">
	//                     <div class="card_image"><img src="${element['Poster']}"></div>
	//                     <div class="card_content">
	//                         <h2 class="card_title">${element['Title']}</h2>
	//                         <p class="card_text">${element['Year']}</p>
	//                     </div>
	//                 </div>
	//             </li>`,
	// 	);
	// });
}

function displayDiv(arg) {
	arg.forEach((element) => {
		res.insertAdjacentHTML(
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
// function resetInput() {
// 	let title = document.getElementById('title');
// 	let year = document.getElementById('year');
// 	// title.style.backgroundColor = 'red';
// 	// year.style.backgroundColor = 'red';
// 	title.value = '';
// 	year.value = '';
// }

const tb = document.getElementById('search-by-title-button');
tb.addEventListener('click', getdata);
const yb = document.getElementById('year');
yb.addEventListener('keyup', getdata);
let movied = document.getElementById('response-title');
let res = document.getElementById('response-title');
let arrdata;
