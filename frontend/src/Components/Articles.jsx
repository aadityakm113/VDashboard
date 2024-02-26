import React,{ useState, useEffect } from 'react';


const Articles = ({value, filter}) => {
    const [data,setData]=useState();
    const [error,setError]=useState(null);

    useEffect(() => {
        fetchAData();
        console.log(data);
    },[value]);

    const fetchAData = async () => {
        try {
            const response = await fetch(`/no_of_articles/${filter.toLowerCase()}/${value}`);
            if(!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            setData(jsonData[0].num_articles);
        } catch(error){
            setError("Failed to fetch data");
            console.error("Error fetching data",error);
        }
    };

  return (
    <div>
        <div>Number of Articles:{data}</div>
    </div>
  )
}

export default Articles;