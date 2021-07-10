const UNCOMPLETED_LIST_BOOK_SHELF = 'incompleteBookshelfList';
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = 'bookId';

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_SHELF);
  const titleBook = document.getElementById('inputBookTitle').value;
  const authorBook = document.getElementById('inputBookAuthor').value;
  const yearBook = document.getElementById('inputBookYear').value;

  const book = makeBook(titleBook, authorBook, yearBook);
  const bookObject = composeBookObject(titleBook, authorBook, yearBook, false);

  book[BOOKSHELF_ITEMID] = bookObject.id;
  books.push(bookObject);

  uncompletedBookList.append(book);
  updateDataBookToStorage();
}

function makeBook(dataTitle, dataAuthor, dataYear, isCompleted) {
  const textTitleBook = document.createElement('td');
  textTitleBook.classList.add('title');
  textTitleBook.innerText = dataTitle;

  const textAuthorBook = document.createElement('td');
  textAuthorBook.classList.add('author');
  textAuthorBook.innerText = dataAuthor;

  const textYearBook = document.createElement('td');
  textYearBook.classList.add('year');
  textYearBook.innerText = dataYear;
  
  const containerTable = document.createElement('tr');
  containerTable.append(textTitleBook, textAuthorBook, textYearBook);

  if (isCompleted) {
    containerTable.append(
      createButtonUndo(),
      createButtonDelete()
    );
  } else {
    containerTable.append(
      createButtonFinished(),
      createButtonDelete()
    );
  }
  
  return containerTable;
}

function createButtonActionFinished(buttonTypeClass, eventListener) {
  const buttonSuccess = document.createElement('td');
  buttonSuccess.classList.add(buttonTypeClass);
  buttonSuccess.type = 'button';
  buttonSuccess.innerText = 'Done';
  buttonSuccess.className = 'btn btn-success btn-sm m-2';
  buttonSuccess.addEventListener('click', function (event) {
    eventListener(event);
  });
  return buttonSuccess;
}

function createButtonActionDelete(buttonTypeClass, eventListener) {
  const buttonDelete = document.createElement('td');
  buttonDelete.classList.add(buttonTypeClass);
  buttonDelete.type = 'button';
  buttonDelete.innerText = 'Delete';
  buttonDelete.className = 'btn btn-danger btn-sm m-2';
  buttonDelete.addEventListener('click', function (event) {
    eventListener(event);
  });
  return buttonDelete;
}

function createButtonActionUndo(buttonTypeClass, eventListener) {
  const buttonUndo = document.createElement('td');
  buttonUndo.classList.add(buttonTypeClass);
  buttonUndo.type = 'button';
  buttonUndo.innerText = 'Undo';
  buttonUndo.className = 'btn btn-warning btn-sm m-2';
  buttonUndo.addEventListener('click', function (event) {
    eventListener(event);
  });
  return buttonUndo;
}

function addBookToCompleted(taskElement) {
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookTitle = taskElement.querySelector('.title').innerText;
  const bookAuthor = taskElement.querySelector('.author').innerText;
  const bookYear = taskElement.querySelector('.year').innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const books = findBook(taskElement[BOOKSHELF_ITEMID]);
  books.isCompleted = true;
  newBook[BOOKSHELF_ITEMID] = books.id;

  listCompleted.append(newBook);
  taskElement.remove();

  updateDataBookToStorage();
}

function undoBookFromCompleted(taskElement){
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_SHELF);
  const bookTitleUndo = taskElement.querySelector('.title').innerText;
  const bookAuthorUndo = taskElement.querySelector('.author').innerText;
  const bookYearUndo = taskElement.querySelector('.year').innerText;
  
  const newBook = makeBook(bookTitleUndo, bookAuthorUndo, bookYearUndo, false);

  const books = findBook(taskElement[BOOKSHELF_ITEMID]);
  books.isCompleted = false;
  newBook[BOOKSHELF_ITEMID] = books.id;

  listUncompleted.append(newBook);
  taskElement.remove();

  updateDataBookToStorage();
}

function createButtonFinished() {
  return createButtonActionFinished("check-button", function(event){
    addBookToCompleted(event.target.parentElement);
  });
}

function removeBookFromCompleted(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOKSHELF_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();
  updateDataBookToStorage();
}

function createButtonDelete() {
  return createButtonActionDelete('trash-button', function (event) {
    removeBookFromCompleted(event.target.parentElement);
  });
}

function createButtonUndo() {
  return createButtonActionUndo('undo-button', function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}



