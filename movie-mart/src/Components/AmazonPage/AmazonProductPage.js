import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./AmazonProductPage.css";
import { useParams } from 'react-router-dom';
const AmazonProductPage = () => {

const styles = {
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '300px', // Set your desired width
      padding: '20px',
      border: '2px solid black',
      borderRadius: '10px',
      backgroundColor: 'lightgrey',
      margin: 'auto', // Center horizontally
      marginTop: '100px', // Center vertically (adjust as needed)
    },
    productName: {
      marginBottom: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    productImage: {
      width: '100%', // Make the image fill the container width
      marginBottom: '10px',
      borderRadius: '5px', // Optional: add rounded corners to the image
    },
    amazonLink: {
      color: 'white',
      padding: '8px',
      backgroundColor: 'black',
      textDecoration: 'none',
      textAlign: 'center',
      borderRadius: '5px', // Optional: add rounded corners to the link
    },
  };
  
    const { UniqId } = useParams();
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productAmazonPage, setProductAmazonPage] = useState("");
    // const [productName, setProductName] = useState("");
    // const [productName, setProductName] = useState("");

    function getImageLink(linksList) {
        // Split the input string into an array using '|' as the separator
        console.log(linksList,"here starts debug");
        const linkArray = linksList.split('|');
      
        // Return the first element of the array
        setProductImage(linkArray[0]);
        console.log(linkArray[0],"image should be set");
        return linkArray[0];
      }

    const check = () => {
        console.log(UniqId);
    }

    useEffect(()=>{
        const apiUrl = `http://127.0.0.1:5000/getAmazonProducts`;
                // Fetch movie data from the API
        axios
            .get(apiUrl, {params: {UniqId}})
          .then((response) => {
            console.log(response.data[0],"Amazon products")
            setProductName(response.data[0]["ProductName"])
            getImageLink(response.data[0]["Image"]);
            setProductAmazonPage(response.data[0]["ProductUrl"])
          })
          .catch((error) => console.error('Error fetching data:', error));
    },[])
return (
     <div style={styles.cardContainer}>
      <h1 style={styles.productName}>{productName}</h1>
      <img src={productImage} alt="Product Image" style={styles.productImage} />
      <a href={productAmazonPage} target="_blank" rel="noopener noreferrer" style={styles.amazonLink}>
        Amazon Page
      </a>
    </div>
);

}
export default AmazonProductPage;