import React, { useState } from 'react';

const BookDetails = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const books = [
    { id: 1, title: 'Master React', price: 670, category: 'programming', inStock: true },
    { id: 2, title: 'Deep Dive into Angular 11', price: 800, category: 'programming', inStock: true },
    { id: 3, title: 'Mongo Essentials', price: 450, category: 'database', inStock: false },
    { id: 4, title: 'JavaScript Fundamentals', price: 550, category: 'programming', inStock: true },
    { id: 5, title: 'Node.js Complete Guide', price: 720, category: 'backend', inStock: true }
  ];

  const categories = ['all', 'programming', 'database', 'backend'];

  // Method 1: Conditional rendering with ternary operator
  const renderBookList = () => {
    return showBooks ? (
      <div className="book-list">
        {books
          .filter(book => selectedCategory === 'all' || book.category === selectedCategory)
          .map(book => (
            <div key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p>Price: ${book.price}</p>
              {/* Method 2: Logical AND operator for conditional rendering */}
              {book.inStock && <span className="in-stock">In Stock</span>}
              {/* Method 3: Ternary operator for conditional styling */}
              <span className={book.inStock ? 'status-available' : 'status-unavailable'}>
                {book.inStock ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          ))}
      </div>
    ) : (
      <p>Books are hidden</p>
    );
  };

  // Method 4: Conditional rendering with if-else logic
  const renderCategoryFilter = () => {
    if (categories.length === 0) {
      return <p>No categories available</p>;
    } else if (categories.length === 1) {
      return <p>Only one category available</p>;
    } else {
      return (
        <div className="category-filter">
          <label>Filter by Category: </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  // Method 5: Conditional rendering based on loading state
  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Loading books...</div>;
    }
    
    return (
      <>
        {renderCategoryFilter()}
        {renderBookList()}
      </>
    );
  };

  // Method 6: Conditional rendering with multiple conditions
  const renderActionButtons = () => {
    const hasBooks = books.length > 0;
    const hasFilteredBooks = books.filter(book => 
      selectedCategory === 'all' || book.category === selectedCategory
    ).length > 0;

    return (
      <div className="action-buttons">
        <button onClick={() => setShowBooks(!showBooks)}>
          {showBooks ? 'Hide' : 'Show'} Books
        </button>
        
        {/* Method 7: Multiple conditions with logical operators */}
        {hasBooks && hasFilteredBooks && (
          <button onClick={() => setIsLoading(true)}>
            Refresh Books
          </button>
        )}
        
        {/* Method 8: Conditional rendering with null */}
        {!hasBooks ? (
          <p>No books available</p>
        ) : !hasFilteredBooks ? (
          <p>No books in selected category</p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="book-details">
      <h2>Book Details</h2>
      {renderContent()}
      {renderActionButtons()}
    </div>
  );
};

export default BookDetails; 