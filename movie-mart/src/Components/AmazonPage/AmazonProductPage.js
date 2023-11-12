import React, {useEffect} from "react";
import axios from 'axios';
import "./AmazonProductPage.css";
import { useParams } from 'react-router-dom';
const AmazonProductPage = () => {
    const { UniqId } = useParams();
    const check = () => {
        console.log(UniqId);
    }

    useEffect(()=>{
        const apiUrl = `http://127.0.0.1:5000/getAmazonProducts`;
                // Fetch movie data from the API
        axios
            .get(apiUrl, {params: {UniqId}})
          .then((response) => {
            console.log(response.data,"Amazon products")
          })
          .catch((error) => console.error('Error fetching data:', error));
    },[])
return (
    <div>
        {UniqId}
        <button onClick={check}>Console log</button>
    </div>
);
}
export default AmazonProductPage;