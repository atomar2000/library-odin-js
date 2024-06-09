const myLibrary = [];
const libBooks = document.createElement("div");
libBooks.id = 'ul-lib-books';

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('input-dialog');
    const showMoreBtn = document.getElementById('show-more-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    function showModal() {
        dialog.showModal();
    }

    function close() {
        dialog.close();
    }

    showMoreBtn.addEventListener('click', showModal);

    submitBtn.addEventListener('click', () => {
        const bookName = document.getElementById('book-name-input');
        const authorName = document.getElementById('author-name-input');
        const pageNbr = document.getElementById('page-nbr-input');
        addBookToLibrary(bookName.value, authorName.value, pageNbr.value);
        bookName.value = '';
        authorName.value = '';
        pageNbr.value = '';
        close();
    });

    close();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.markAsRead = function() {
        this.read = true;
    }
    this.markAsUnread = function() {
        this.read = false;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    appendNewCardInHtml(book);
}

function appendNewCardInHtml(book) {
    const listElement = createBookCard(book);
    libBooks.appendChild(listElement);
    document.getElementById("card-list").appendChild(libBooks);
}

function createBookCard(book) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "book-card";
    const bookNameSpan = document.createElement("span");
    bookNameSpan.innerText = `Book: ${book.title}`;

    const authorNameSpan = document.createElement("span");
    authorNameSpan.innerText = `Author: ${book.author}`;

    const pagesSpan = document.createElement("span");
    pagesSpan.innerText = `Pages: ${book.pages}`;

    const removeBtnContainer = document.createElement("div");
    removeBtnContainer.id = 'remove-btn-container';

    const removeBtn = document.createElement("button");
    removeBtn.id = 'remove-btn';
    removeBtn.innerText = 'X'
    removeBtn.addEventListener("click", function() {
        const card = removeBtn.parentNode.parentNode;
        card.parentNode.removeChild(card);
    });

    const readBtn = document.createElement("button");
    readBtn.id = 'read-btn';

    readBtn.addEventListener("click", function() {
        if(readBtn.id === "read-btn"){
            book.markAsRead();
            readBtn.id = "read-btn-selected";
        } else {
            book.markAsUnread();
            readBtn.id = "read-btn";
        }
    });

    addSvgToBtn(readBtn);


    removeBtnContainer.appendChild(readBtn);
    removeBtnContainer.appendChild(removeBtn);

    cardDiv.appendChild(bookNameSpan);
    cardDiv.appendChild(authorNameSpan);
    cardDiv.appendChild(pagesSpan);
    cardDiv.appendChild(removeBtnContainer);
    return cardDiv;
}

function showInputDialog(){
    document.getElementById('input-dialog').showModal();
}

const showMoreBtn = document.getElementById('show-more-btn');
showMoreBtn.addEventListener("click", function() {
    showInputDialog();
});

function addSvgToBtn(readBtn) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Once the SVG file is loaded, insert it into the SVG container element
            readBtn.innerHTML = xhr.responseText;
        }
    };

    // Specify the path to your SVG file
    const svgFilePath = './resources/book-svgrepo-com.svg';

    // Open and send the request to load the SVG file
    xhr.open('GET', svgFilePath, true);
    xhr.send();
}
