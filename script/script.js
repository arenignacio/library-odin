//Create library that you can add books to
const tBody = document.querySelector('tbody');
const buttons = document.querySelectorAll('input[type="button"]');
const html = document.querySelector('body');
const addBtn = document.getElementById('add-btn');
let rect = addBtn.getBoundingClientRect();

function setLibrary(value) {
	const JSONData = JSON.stringify(value);
	localStorage.setItem('myLibrary', JSONData);
}

function getLibrary() {
	const myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	return myLibrary ? myLibrary : [];
}

//book contains name, author, number pages, and read/not-read status
function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

//add book to library
function addBook(title, author, pages, status = false, idx = '') {
	const myLibrary = getLibrary();
	author = author === '' ? 'unknown' : author;
	pages = pages === '' ? 'unknown' : pages;
	const newBook = new Book(title, author, pages, status);

	if (!idx) myLibrary.push(newBook);
	else myLibrary.splice(idx.substr(1), 1, newBook); //if an index is provided, it's a cue to replace an element in array

	renderList(myLibrary, tBody);
	setLibrary(myLibrary);

	return myLibrary;
}

//remove book from library
function removeBook(index) {
	const myLibrary = getLibrary();
	myLibrary.splice(index, 1);
	renderList(myLibrary, tBody);
	setLibrary(myLibrary);
	return myLibrary;
}

function toggleForm() {
	document.querySelector('.form-container').classList.toggle('hidden');
	document.getElementById('table-container').classList.toggle('blur');
}

function formValid() {
	const title = document.getElementById('in-title');
	const pages = document.getElementById('in-pages');
	let isValid = true;

	title.style.removeProperty('box-shadow');
	pages.style.removeProperty('box-shadow');

	if (title.value === '') {
		title.style.boxShadow = '2px 2px 1px red';
		isValid = false;
	}

	if (isNaN(pages.value) && pages.value !== '' && pages.value !== 'unknown') {
		pages.style.boxShadow = '2px 2px 1px red';
		isValid = false;
	}

	return isValid;
}

//render library to table
function renderList(books, tBody) {
	let htmlString = '';
	const myLibrary = getLibrary();

	if (books.length === 0) {
		tBody.innerHTML += '<tr><td>Table is empty</td></tr>';
		return;
	}

	books.forEach((book, idx) => {
		//new plan is to create html string that will be inserted in tbody innerHTML;
		htmlString += `<tr id="bk-${idx}" class="onHover entry ${
			idx % 2 === 0 ? '' : 'bg-grey'
		}" >`;

		//create, fill in and append columns for book info
		for (const key in book) {
			if (key === 'status')
				htmlString += `<td class="book-${key}">${
					book[key] ? 'read' : 'unread'
				}</td>`;
			else htmlString += `<td class="book-${key}">${book[key]}</td>`;
		}

		htmlString += `<td class="book-delete delete-btn-container"><div id="del-${idx}" class="delete-btn hidden">+</div></td></tr>`;
	});

	tBody.innerHTML = htmlString;

	//select columns, buttons
	const td = document.querySelectorAll('td');

	//get information from row
	td.forEach((td) => {
		td.addEventListener('click', (e) => {
			//if delete button is clicked
			if (e.target.classList.contains('delete-btn')) {
				e.target.parentNode.parentNode.remove(); //remove entire parent of parent which is tr (row > column > button)
				const tBody = document.querySelector('tbody');
				const library = removeBook(e.target.id.substr(4));
				return;
			}

			const idx = e.target.parentNode.id.substr(3);
			const book = myLibrary[idx];

			for (const key in book) {
				if (key === 'status')
					document.getElementById(`in-${key}`).checked = book[key];
				else document.getElementById(`in-${key}`).value = book[key];
			}

			document.querySelector('.form-container').id = `f${idx}`;
			formValid();
			toggleForm();
		});
	});

	//pop up delete button on hover
	td.forEach((td) => {
		td.addEventListener('mouseover', (e) => {
			if (!e.target.classList.contains('delete-btn'))
				e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});

		//hide delete button when mouse leaves row
		td.addEventListener('mouseout', (e) => {
			if (!e.target.classList.contains('delete-btn'))
				e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});
	});
}

//adds event to save and cancel buttons - the only two button elements in site
buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const isValid = formValid();

		//save button inserts book in library if valid
		if (e.target.value === 'save') {
			const title = document.getElementById('in-title').value;
			const author = document.getElementById('in-author').value;
			const pages = document.getElementById('in-pages').value;
			const status = document.getElementById('in-status').checked;
			const idx = document.querySelector('.form-container').id;

			if (isValid) {
				setLibrary(addBook(title, author, pages, status, idx));
				console.log('if is true');
			} else return;
		}
		rect = addBtn.getBoundingClientRect();
		console.log(rect);
		toggleForm();
	});
});

//book+ functionality - reset
addBtn.addEventListener('click', () => {
	toggleForm();

	const title = document.getElementById('in-title');
	const author = document.getElementById('in-author');
	const pages = document.getElementById('in-pages');
	const status = document.getElementById('in-status');
	const form = document.querySelector('.form-container');

	title.value = '';
	author.value = '';
	pages.value = '';
	form.id = '';
	status.checked = false;
});

//close form if user click outside
window.addEventListener('click', (e) => {
	const formHidden = document
		.querySelector('.form-container')
		.classList.contains('hidden');
	if (e.target.classList.contains('form-container')) {
		formHidden ? null : toggleForm();
	}
});

//initialization of library
if (!localStorage.getItem('myLibrary')) {
	addBook('A Song of Ice and Fire', 'George R.R. Martin', 694, false);
	addBook('Smokes and Mirrors', 'Neil Gaiman', 384, true);
	addBook('Gone Girl', 'Gillian Flynn', 432);
} else {
	renderList(getLibrary(), tBody);
}

console.log(rect);
