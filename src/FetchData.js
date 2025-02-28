import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        // Replace with your backend URL
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data`); 

        // Log the response to check the data from the backend
        console.log("Fetched data:", response.data);

        // Set the fetched data to state
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div>
      <h2>Fetched Data</h2>
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchData;
