import {useState,useEffect} from 'react';
import './App.css';
import Filter from './Components/filter/Filter';

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
      <Filter className="column-20"></Filter>
      <div className='column-80'>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
      </div>
    </div>
  );
}

export default App;
