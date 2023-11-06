import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import "./AmazonProducts.css";

function ListAmazonProducts() {
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageURL] = useState("");

  function getImageLink(linksList) {
    // Split the input string into an array using '|' as the separator
    console.log(linksList,"here starts debug");
    const linkArray = linksList.split('|');
  
    // Return the first element of the array
    setImageURL(linkArray[0]);
    console.log(linkArray[0],"image should be set");
    return linkArray[0];
  }

  useEffect(() => {
    // Fetch data from the /getAmazonProducts API endpoint
    const apiUrl = `http://127.0.0.1:5000/getAmazonProducts`;
    const title ="Thor";
    console.log("Came here",title);
    // Fetch movie data from the API
    axios
        .get(apiUrl)
      .then((response) => {
        console.log(response.data,"Amazon products");
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const memoizedImageLinks = useMemo(() => {
    return products.map((product) => getImageLink(product.Image));
  }, [products]);

  return (
    <div className="product-list">
      <h2>Amazon Products</h2>
      <div className="product-grid">
        {products.map((product,index) => (
          <div
            key={product.UniqId}
            className="product-card"
            style={{
              border: '4px solid black',
              padding: '10px',
              margin: '10px',
            }}
          >
            <img src={memoizedImageLinks[index]} width={200} height={300}/>
            <h3>{product.ProductName}</h3>
            <p>Price: ${product.SellingPrice}</p>
            <p>Category: {product.Category}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListAmazonProducts;
