async function loadBooks() {
  // TODO 13: fetch("/books") and convert to JSON
  // TODO 14: render books into #book-list
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  try {
    const response = await fetch(q ? `/books?q=${encodeURIComponent(q)}` : "/books");
    const books = await response.json();
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    books.forEach((book) => {
      const li = document.createElement("li");
      
      const textSpan = document.createElement("span");
      textSpan.textContent = `${book.bookNo}: ${book.bookName}`;
      li.appendChild(textSpan);

      const deleteForm = document.createElement("form");
      deleteForm.action = "/books/delete";
      deleteForm.method = "POST";
      deleteForm.className = "inline-delete";

      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "bookNo";
      hiddenInput.value = book.bookNo;

      const deleteButton = document.createElement("button");
      deleteButton.type = "submit";
      deleteButton.textContent = "Delete";

      deleteForm.appendChild(hiddenInput);
      deleteForm.appendChild(deleteButton);
      
      li.appendChild(deleteForm);
      bookList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

window.addEventListener("DOMContentLoaded", loadBooks);
