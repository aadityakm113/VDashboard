import {useState,useEffect, useRef} from 'react';
import './App.css';
import Filter from './Components/filter/Filter';
import WorldMap from './Components/WorldMap';

function App() {
  const [filter,setFilter] = useState("default");

  function chooseFilter(msg) {
    setFilter(msg);
  }

  useEffect(() => {
    setFilter(e=>{
      if(e!==filter){
        return filter;
      }
      return e;
    })
    console.log('new state', filter)
  }, [filter])

  return (
    <div className="App">
      {/* <h1>VDashboard</h1>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <p>End Year: {data.end_year}</p>  
      )} */}
      <Filter chooseFilter={chooseFilter} className="column-20"></Filter>
      <div className='column-80'>
        <WorldMap filter={filter} width={800} height={500}/>
        <div className='chart'>Chart</div>
        <div className='chart'>Chart</div>
      </div>  
    </div>
  );
}

export default App;
