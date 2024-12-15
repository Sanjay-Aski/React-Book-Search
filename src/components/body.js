import React, { useState } from 'react';
import '../Css/body.css';

const short_desc = (str) => {
  if (str && str.length > 100) {
    return str.slice(0, 100) + '...';
  }
  return str;
};

const Page_Book = ({ book, closeModal }) => {
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || 'Not Found';
  return (
    <div className="pagebook-modal">
      <div className="pagebook-content">
        <div className="pagebook-image">
          {thumbnail && <img src={thumbnail} alt={book.volumeInfo.title} />}
        </div>
        <div className="pagebook-details">
          <h3><strong>{book.volumeInfo.title}</strong></h3>
          <p><strong>Author(s):</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
          <p><strong>Description:</strong> {book.volumeInfo.description || 'No description available'}</p>
        </div>
      </div>
      <button onClick={closeModal} className="close-btn">Close</button>
    </div>
  );
};

const Body = ({ books, loading, error, query }) => {
  const [modalBook, setModalBook] = useState(null);

  const openModal = (book) => {
    setModalBook(book);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalBook(null);
    document.body.style.overflow = 'auto';
  };

  const renderBooks = () => {
    let bookItems = [];
    if (books && books.length > 0) {
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || 'Not Found';
        bookItems.push(
          <div key={i} className="book" onClick={() => openModal(book)}>
            {thumbnail && <img src={thumbnail} alt={book.volumeInfo.title} />}
            <h3><strong>{book.volumeInfo.title}</strong></h3>
            <p><strong>Author(s):</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Description:</strong> {short_desc(book.volumeInfo.description) || 'No description available'}</p>
          </div>
        );
      }
    } else {
      bookItems.push(<p key="no-results">No results found for your search.</p>);
    }
    return bookItems;
  };

  return (
    <div className="body-container">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {query && !loading && !error && (
        <h2>Search results for: <strong>{query}</strong></h2>
      )}
      <div className="books-list">
        {renderBooks()}
      </div>
      
      {modalBook && <Page_Book book={modalBook} closeModal={closeModal} />}
    </div>
  );
};

export default Body;
