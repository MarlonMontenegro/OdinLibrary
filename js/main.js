/* ======== GET INPUT FROM FORM ======== */
const nameInput = document.querySelector("#bookName");
const categoryInput = document.querySelector("#bookCategory");
const authorInput = document.querySelector("#author");
const numberOfPagesInput = document.querySelector("#numberOfPages");
const isReadInput = document.querySelector("#isRead");

const addBookForm = document.querySelector("form");

/* ======== MODAL ======== */
const btnOpenModal = document.querySelector("#btn-open-modal");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    modal.close();
});

btnOpenModal.addEventListener("click", () => {
    modal.showModal();
});

const myLibrary = [];

function Book(title, author, pages, isRead, category) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.category = category;
}

function addBookToLibrary(title, author, pages, isRead, category) {
    const newBook = new Book(title, author, pages, isRead, category);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false, "Fantasy");
addBookToLibrary("Dune", "Frank Herbert", 688, false, "Science Fiction");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, true, "Classic");

function removeBook(id) {
    myLibrary.splice(id, 1);
    showBooks();
    setupRemoveBookListeners();
}

function changeReadingStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    showBooks();
    setupRemoveBookListeners();
}

function showBooks() {
    const bookListContainer = document.getElementById('bookList');
    bookListContainer.innerHTML = '';

    myLibrary.forEach(function (book, index) {
        const bookTable = document.createElement('tr');

        const title = document.createElement('td');
        const category = document.createElement('td');
        const author = document.createElement('td');
        const pages = document.createElement('td');
        const status = document.createElement('td');

        /* ICONS */
        const deleteBook = document.createElement('td');
        deleteBook.className = 'icons-remove';

        const removeButton = document.createElement('ion-button');
        removeButton.classList.add('remove-button');
        const removeIcon = document.createElement('ion-icon');
        removeIcon.name = 'close-circle-sharp';
        removeButton.appendChild(removeIcon);
        deleteBook.appendChild(removeButton);

        // Adjuntar evento de eliminación al botón de eliminación
        removeButton.addEventListener('click', () => {
            removeBook(index);
        });

        const changeStatusBtn = document.createElement('td');
        changeStatusBtn.className = 'isRead';

        const iconButtonRead = document.createElement("ion-button");
        const isReadIcon = document.createElement("ion-icon");
        isReadIcon.name = "book-sharp";
        iconButtonRead.classList.add("status-button");
        iconButtonRead.appendChild(isReadIcon);
        changeStatusBtn.appendChild(iconButtonRead);

        // Adjuntar evento de cambio de estado al botón de cambio de estado
        iconButtonRead.addEventListener('click', () => {
            changeReadingStatus(index);
        });

        title.textContent = book.title;
        category.textContent = book.category;
        author.textContent = book.author;
        pages.textContent = book.pages;

        // Display "Read" or "Unread" based on isRead value
        status.textContent = book.isRead ? "Read" : "Unread";

        bookTable.appendChild(title);
        bookTable.appendChild(category);
        bookTable.appendChild(author);
        bookTable.appendChild(pages);
        bookTable.appendChild(status);
        bookTable.appendChild(deleteBook);
        bookTable.appendChild(changeStatusBtn);

        bookListContainer.appendChild(bookTable);
    });
}

addBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value;
    const category = categoryInput.value;
    const author = authorInput.value;
    const numberOfPages = numberOfPagesInput.value;
    const isRead = isReadInput.checked;

    addBookToLibrary(name, author, numberOfPages, isRead, category);

    addBookForm.reset();

    if (myLibrary.length > 0) {
        // Update the books display
        showBooks();
        // Set up event listeners after showing books
        setupRemoveBookListeners();
    } else {
        console.error("Error adding the book to the library.");
    }
});

function setupRemoveBookListeners() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            removeBook(index);
        });
    });
}

// Initial setup when the page loads
showBooks();
setupRemoveBookListeners();