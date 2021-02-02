'use strict'


function init() {
    console.log('Welcome to the book store');
    doTrans();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = '';
     
    for (var i = gPageIdx * PAGE_SIZE; (i <= PAGE_SIZE * (gPageIdx + 1) -1) && (i < gBooks.length); i++) {  

        var currBook = books[i];
        var currencyChange = formatCurrency(currBook.price);
        strHTML += `
            <tr>
                <td>${currBook.id}</td>
                <td>${currBook.bookName}</td>
             <td>${currencyChange}</td>
             <td><button data-trans="read" onclick="onRead('${currBook.id}')"class="read">Read</button></td>
             <td><button data-trans="update" onclick="onUpdateBook('${currBook.id}')"class="update">Update</button></td>
             <td><button data-trans="delete" onclick="onRemoveBook('${currBook.id}')" class="delete">Delete</button></td>
            </tr>`

    }
    var elContainer = document.querySelector('.books-table tbody');
    elContainer.innerHTML = strHTML;
}

function onAddBook(ev) {
    ev.preventDefault();
    var bookName = document.querySelector('input[name=book-name]').value;
    var bookPrice = document.querySelector('input[name=book-price]').value;
    if (!bookName || !bookPrice) return;

    addBook(bookName, bookPrice);
    renderBooks();
    document.querySelector('input[name=book-name]').value = null;
    document.querySelector('input[name=book-price]').value = null;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('What is the book\'s new price?');
    if (!newPrice) return;

    updateBook(bookId, newPrice);
    renderBooks();
}

function onAddReview(ev) {
    ev.preventDefault();

    var elInput = document.querySelector('input[name=review]');
    if (!elInput.value) return;
    addReview(elInput.value);
    document.querySelector('input[name=review]').value = '';
}

function onSetSort(sortBy) {
     setSort(sortBy);
    sortBooks();
    renderBooks();
}

function onRead(bookId) {
    var currBook = getBookById(bookId);
    currBook;  
    
    var elModal = document.querySelector('.modal');
    elModal.style.visibility = 'visible';

    var ratings = currBook.review;
    var elModalHtml = document.querySelector('.modal');

    elModalHtml.innerHTML = ` <h2 data-trans="modal-details" >Book Details</h2>
    <h3 ><span data-trans="modal-name">Name:</span> <span class="span1">${currBook.bookName}</span></h3><br>
     <h3><span data-trans="modal-price">Price:</span><span class="span2">${formatCurrency(currBook.price)}</span></h3><br>
    <h4><span data-trans="modal-rtng">Ratings (out of 5):</span><span span class="span3">${ratingStars(ratings)}</span></h4>
    <div class="about">
        <img src="${currBook.imgUrl}">
        <p>'${currBook.info}'</p>
        <div class="insert-review">
            <form onsubmit="onAddReview(event)">
                <input type="number" placeholder="review 1-10" max="10" min="1" name="review">
                <button data-trans="modal-save" class="btn">Save</button>
                <button data-trans="modal-close" onclick="onCloseModal()" class="btn">Close</button>
            </form>
        </div>
    </div>`

doTrans();
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.visibility = 'hidden';
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPreviousPage() {
    prevPage();
    renderBooks();
}


function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if(lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    renderBooks();
    doTrans();
}