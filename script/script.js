//Create library that you can add books to
const myLibrary = [];

//book contains name, author, number pages, and read/not-read status
function Book(name, author, pages, read) {
	this.name = name;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

//add book to library
function addBook(name, author, pages, read = false) {
	const newBook = new Book(name, author, pages, read);
	myLibrary.push(newBook);
}

//remove book from library
function removeBook(name) {
	const index = myLibrary.findIndex((el) => {
		return el.name === name;
	});

	myLibrary.splice(index, 1);

	return myLibrary;
}

addBook('Meditation', 'Marcus Aurelius', 234, true);
addBook('Ratata', 'Aren', 534);
addBook('Alamat ng Matsing', 'Aren', 532);
