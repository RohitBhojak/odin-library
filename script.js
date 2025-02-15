const themeIcon = document.querySelector("#theme-icon");
const svgIcons = document.querySelectorAll(".svg");
const addBookButton = document.querySelector("#add-book");
const addBookForm = document.querySelector("#add-book-form");
const addBookModal = document.querySelector("#add-book-modal");
const cardContainer = document.querySelector(".card-container");
const submitButton = document.querySelector("button[type='submit']");

const myLibrary = [];

// event listeners

// theme toggle event
themeIcon.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.removeAttribute("data-theme");
        themeIcon.setAttribute("src", "./assets/weather-night.svg");
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.setAttribute("src", "./assets/weather-sunny.svg");
    }
    for (const icon of svgIcons) {
        icon.classList.toggle("dark");
    }
});

// add book modal event
addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
});

// add book to library event
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").checked;

    myLibrary.push(new book(title, author, pages, status));
    addBookForm.reset();
    displayBooks();
    addBookModal.close();
})

// toggle read status event
cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("status")) {
        const index = event.target.parentElement.getAttribute("data-index");
        toggleReadStatus(index);
    }
})

// delete book event
cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const index = event.target.parentElement.getAttribute("data-index");
        deleteBook(index);
    }
})

// book constructor
function book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// protoype functions
book.prototype.toggleStatus = function() {
    this.status = !this.status;
}

// functions

// display books function
function displayBooks()  {
    cardContainer.innerHTML = "";
    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index", myLibrary.indexOf(book));
        card.innerHTML = `
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button class="status ${book.status? "read": ""}">${book.status ? "Read" : "Not read"}</button>
            <button class="delete">Delete</button>
        `;
        cardContainer.appendChild(card);
    }
}

// delete book function
function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// toggle read status function
function toggleReadStatus(index) {
    myLibrary[index].toggleStatus();
    const cardStatus = document.querySelector(`.card[data-index="${index}"] .status`);
    cardStatus.textContent = myLibrary[index].status ? "Read" : "Not read";
    cardStatus.classList.toggle("read");
}

// test
const book1 = new book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
const book2 = new book("To Kill a Mockingbird", "Harper Lee", 281, false);
const book3 = new book("No Longer Human", "Osamu Dazai", 304, true);
const book4 = new book("Flowers for Algernon", "Daniel Keyes", 272, true);
const book5 = new book("The Shining", "Stephen King", 447, false);
myLibrary.push(book1, book2, book3, book4, book5);
displayBooks();