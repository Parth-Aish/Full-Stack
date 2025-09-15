import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the main list of books
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
  ]);

  // State for the search input
  const [searchTerm, setSearchTerm] = useState('');

  // State for the "add new book" form inputs
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // --- Event Handlers ---

  // Handles input changes for the "add book" form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Handles adding a new book to the list
  const handleAddBook = (event) => {
    event.preventDefault(); // Prevents page reload on form submission
    if (newBook.title && newBook.author) {
      setBooks([...books, { ...newBook, id: Date.now() }]);
      setNewBook({ title: '', author: '' }); // Clear the form
    }
  };

  // Handles removing a book from the list
  const handleRemoveBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  // --- Filtering Logic ---

  // Filter books based on the search term (case-insensitive)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>Library Management System</h1>
      </header>

      {/* Add Book Form */}
      <div className="card add-book-form">
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={newBook.author}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      {/* Search and Book List */}
      <div className="card book-list-section">
        <h2>Book Collection</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          className="search-input"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <span>
                <strong>{book.title}</strong> by {book.author}
              </span>
              <button onClick={() => handleRemoveBook(book.id)} className="remove-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;