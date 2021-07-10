const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    alert('Browser is not support local storage');
  }
  return true;
}

function saveDataBook() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
  const serializedDataBook = localStorage.getItem(STORAGE_KEY);
  let dataBook = JSON.parse(serializedDataBook);

  if (books !== null) {
    books = dataBook;
    document.dispatchEvent(new Event('ondataloaded'));
  }
}

function updateDataBookToStorage() {
  if (isStorageExist()) {
    saveDataBook();
  }
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) 
    return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId)
    return index;
    index++;
  }
  return -1;
}

function refreshDataBookShelf() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_SHELF);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
    newBook[BOOKSHELF_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}