import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="app-container">
      <h1>Fetch Data From Feck ApI</h1>
      <ul className="record-grid">
        {currentRecords.map((record) => (
          <li key={record.id}>
            <h3>{record.title}</h3>
            <p>{record.body}</p>
          </li>
        ))}
      </ul>
      <ul className="pagination">
        <li>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
              {number}
            </button>
          </li>
        ))}
        <li>
          <button onClick={nextPage} disabled={currentPage === pageNumbers.length}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default App;
