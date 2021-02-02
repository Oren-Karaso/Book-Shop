'use strict'
const STORAGE_KEY = 'bookstore';

const PAGE_SIZE = 5;
var gPageIdx = 0;

var gBooks = [];
var gCurrBook;
var gSortBy = 'added';

createBooks();

function createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = ['The Tail Of Pupik', 'Pupik- The Grand Return', 'Revenge Of The Pupik',
            'Game Of Clones', 'What If (We Are Just A Dream)', 'Koko- The Biography', 'Lama Lo?', 'The Mossad Greatest Hits',
            'Alone In The Wild', 'I Am Who I Am'].map(function (name) {
                return createBook(name, '35');
            });
    }
    gBooks = books;
    _saveBooksToStorage();
}

function createBook(name, price) {
    var firstAdded = new Date()
    var book = {
        id: _makeId(),
        bookName: name,
        price: price,
        imgUrl: 'https://picsum.photos/200/300',
        info: makeLorem(),
        review: 0,
        added: firstAdded.getTime(),
    }
    return book;
}

function removeBook(bookId) {
    var bookToRemove = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks.splice(bookToRemove, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = createBook(name, price);
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, bookPrice) {
    var bookToUpdate = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks[bookToUpdate].price = bookPrice;
    _saveBooksToStorage();
}

function addReview(value) {
    gCurrBook.review = value;
    _saveBooksToStorage();
}

function sortBooks() {
    if (gSortBy === 'added') {
        gBooks.sort(function (book1, book2) {
            return book1.added - book2.added;
        });
    }
    else if (gSortBy === 'price') {
        gBooks.sort(function (book1, book2) {
            return book1.price - book2.price;
        });
    } else if (gSortBy === 'title') {
        gBooks.sort(function (book1, book2) {
            // console.log(book1.bookName - book2.bookName);
            return book1.bookName.localeCompare(book2.bookName);
        });
    }
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getBooks() {
    return gBooks;
}

function getBookById(bookId) {
    var bookToReturn = gBooks.findIndex(function (book) {  //change to find
        return book.id === bookId;
    });
    return gBooks[bookToReturn];
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length ) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE < 0 ) {
        gPageIdx = parseInt(gBooks.length / PAGE_SIZE);
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

// function _clearStorage() {
//     localStorage.removeItem(STORAGE_KEY);
// }

function ratingStars(rating) {
    var ratings = ' ';
    for (var i = 0; i < parseInt(rating / 2); i++) {
        ratings += '⭐';
    }
    return ratings;
}

