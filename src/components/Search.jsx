import React from 'react'

const App = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
      <img src='search.png' alt='search' />

      <input
        type="text"
        placeholder="Search  through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
export default App;