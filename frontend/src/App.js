import {useState,useEffect, useRef} from 'react';
import './App.css';
import Filter from './Components/filter/Filter';
import WorldMap from './Components/WorldMap';
import Bar from './Components/Bar';
import Line from './Components/Line';

function App() {
  const [filter,setFilter] = useState("default");
  const [scrollPos, setScrollPos] = useState();

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
      <Filter chooseFilter={chooseFilter} className="column-25"></Filter>
      <div className='column-75'>
      <h2>Country</h2>
        <div className='section'>
          <div className='chart'>
            <WorldMap filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Bar filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Line filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Bar filter={filter} width={400} height={250}/>
          </div>
        </div>
        <h2>Sector</h2>
        <div className='section'>
          <div className='chart'>
          <Line filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Bar filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Line filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Bar filter={filter} width={400} height={250}/>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default App;
