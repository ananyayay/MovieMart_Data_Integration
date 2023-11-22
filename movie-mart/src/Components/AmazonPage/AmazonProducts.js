import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import AmazonProductPage from './AmazonProductPage';
import { Link } from 'react-router-dom';
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

  const styles = {
    
    productList: {
      textAlign: 'center',
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    productCard: {
      border: '4px solid black',
      padding: '10px',
      margin: '10px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },
    productName: {
      fontSize: '18px',
      margin: '10px 0',
      fontWeight: 'bold',
      color: '#333',
    },
    price: {
      margin: '5px 0',
      color: '#777',
    },
    category: {
      color: '#555',
    },
  };
  

  return (
    <div className="product-list" style={styles.productList}>
      <h2 style={styles.heading}>Amazon Products</h2>
      <div className="product-grid" style={styles.productGrid}>
        {products.map((product, index) => (
          <div
            key={product.UniqId}
            className="product-card"
            style={styles.productCard}
          >
            <Link to={`/product/${product.UniqId}`} style={styles.link}>
              <img
                src={memoizedImageLinks[index]}
                alt={product.ProductName}
                width={200}
                height={300}
                style={styles.image}
              />
              <h3 style={styles.productName}>{product.ProductName}</h3>
              <p style={styles.price}>Price: ${product.SellingPrice}</p>
              <p style={styles.category}>Category: {product.Category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListAmazonProducts;
