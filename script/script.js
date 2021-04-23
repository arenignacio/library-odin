//Create library that you can add books to
const myLibrary = [];
const tBody = document.querySelector('tbody');

//book contains name, author, number pages, and read/not-read status
function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

//add book to library
function addBook(title, author, pages, status = false) {
	status = status === true ? 'read' : 'unread';
	const newBook = new Book(title, author, pages, status);
	myLibrary.push(newBook);
}

//remove book from library
function removeBook(index) {
	myLibrary.splice(index, 1);
	renderList(myLibrary, tBody);

	return myLibrary;
}

//render library to table
function renderList(books, tBody) {
	let htmlString = '';

	books.forEach((book, idx) => {
		//new plan is to create html string that will be inserted in tbody innerHTML;
		htmlString += `<tr class="onHover entry ${
			idx % 2 === 0 ? '' : 'bg-grey'
		}" >`;

		//create, fill in and append columns for book info
		for (const key in book) {
			htmlString += `<td class="book-${key}">${book[key]}</td>`;
		}

		htmlString += `<td class="book-delete delete-btn-container"><div id="del-${idx}" class="delete-btn hidden">X</div></td></tr>`;
	});

	tBody.innerHTML = htmlString;

	//select columns, buttons
	const td = document.querySelectorAll('td');
	const button = document.querySelectorAll('.delete-btn-container');

	//pop up delete button on hover
	td.forEach((td) => {
		td.addEventListener('mouseover', (e) => {
			console.log(e.target.parentNode.lastChild);
			if (!e.target.classList.contains('delete-btn'))
				e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});

		//hide delete button when mouse leaves row
		td.addEventListener('mouseout', (e) => {
			if (!e.target.classList.contains('delete-btn'))
				e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});
	});

	//
	button.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.target.parentNode.remove();
			const tBody = document.querySelector('tbody');
			const library = removeBook(e.target.id.substr(4));
			renderList(library, tBody);
		});
	});
}

addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);

renderList(myLibrary, tBody);
