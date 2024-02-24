import {useState,useEffect} from 'react';
import './App.css';
import Filter from './Components/filter/Filter';
import WorldMap from './Components/WorldMap';

function App() {
  const [data,setData]= useState({})
  const [world,setWorld]=useState({});
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData();
    fetchWorld();
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
  const fetchWorld = async () => {
    try {
      const response = await fetch("/countries/country");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setWorld(jsonData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };
  return (
    // <div className="App">
    //   <Filter className="column-20"></Filter>
    //   <div className='column-80'>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //     <div className='chart'>Chart</div>
    //   </div>
    // </div>
    <div className="App">
      {/* <h1>VDashboard</h1>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <p>End Year: {data.end_year}</p>  
      )} */}
      <Filter className="column-20"></Filter>
      <div className='column-80'>
        <WorldMap data={world} width={800} height={500}/>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
      </div>  
    </div>
  );
}

export default App;
