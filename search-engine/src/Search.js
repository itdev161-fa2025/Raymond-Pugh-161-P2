import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items', {
          params: { search: searchQuery }
        });
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching items', err);
      }
    };

    fetchItems();
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Items</h1>
      <input
        type="text"
        placeholder="Search for items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    alert('Item deleted');
    window.location.reload();
  } catch (err) {
    console.error('Error deleting item', err);
  }
};

export default Search;
