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

	return myLibrary;
}

//render library to table
function renderList(books, tBody) {
	books.forEach((book, idx) => {
		const tr = document.createElement('tr');
		tr.style.backgroundColor =
			idx % 2 === 0 ? 'white' : 'hsla(0, 0%, 70%, .3)';
		tr.id = `bk-${idx}`;
		tr.classList.add('onHover', 'entry');

		//create, fill in and append columns for book info
		for (const key in book) {
			const td = document.createElement('td');
			td.classList.add(`book-${key}`);
			td.innerText = book[key];
			tr.append(td);
		}

		//column for delete button
		const td = document.createElement('td');
		const button = document.createElement('div');
		button.classList.add('delete-btn', 'hidden');
		button.innerText = 'x';
		button.id = `del-${idx}`;
		td.classList.add('book-delete');
		td.append(button);
		tr.append(td);

		//pop up delete button on hover at row
		tr.addEventListener('mouseover', (e) => {
			e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});

		//hide delete button when mouse leaves row
		tr.addEventListener('mouseout', (e) => {
			e.target.parentNode.lastChild.lastChild.classList.toggle('hidden');
		});
		tBody.append(tr);
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
