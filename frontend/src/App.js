import {useState,useEffect} from 'react';
import './App.css';

function App() {
  const [data,setData]= useState({})
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/list");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  return (
    <div className="App">
      <h1>VDashboard</h1>
      <p></p>
    </div>
  );
}

export default App;
