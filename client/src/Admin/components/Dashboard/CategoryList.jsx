import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <h3>Category Donations</h3>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div className="category-item" key={category.category_id}>
            <p>
              <strong>Category ID:</strong> {category.category_id} - <strong>Total Amount:</strong> ${category.total_amount.toFixed(2)}
            </p>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoryList;  

 