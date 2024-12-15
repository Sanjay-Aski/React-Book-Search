import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Body from './components/body';
import Navbar_desktop from './components/Navbar';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('popular');

  useEffect(() => {
    fetchBooks('popular');
  }, []);

  const fetchBooks = (category) => {
    setCategory(category);
    setLoading(true);
    setError('');
    let url = '';

    if (category === 'popular') {
      url = 'https://www.googleapis.com/books/v1/volumes?q=best+seller';
    } else if (category === 'latest') {
      url = 'https://www.googleapis.com/books/v1/volumes?q=newest';
    } else if (category === 'highRated') {
      url = 'https://www.googleapis.com/books/v1/volumes?q=rating';
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        } else {
          setError('No books found.');
        }
      })
      .catch((err) => {
        setError('Failed to retrieve data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery) return;

    setLoading(true);
    setError('');

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        } else {
          setError('No books found.');
        }
      })
      .catch((err) => {
        setError('Failed to retrieve data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="_Whole-Container">
      <div className="Navbar">
        <Navbar_desktop onSearch={handleSearch} fetchBooks={fetchBooks} />
      </div>
      <div className="Body">
        <Body books={books} loading={loading} error={error} query={query} category={category} />
      </div>
    </div>
  );
}

export default App;
