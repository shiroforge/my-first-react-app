import React from 'react'

const App = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
      <div>
      <img src='search.png' alt='search' />

      <input
        type="text"
        placeholder="Search  through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
export default App;