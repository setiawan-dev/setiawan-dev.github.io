document.addEventListener('DOMContentLoaded', function () {
  const submitFormInputBook = document.getElementById('inputBook');

  submitFormInputBook.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data success saved!');
});

document.addEventListener('ondataloaded', () => {
  refreshDataBookShelf();
});
