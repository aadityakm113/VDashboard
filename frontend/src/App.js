import {useState,useEffect, useLayoutEffect, useRef} from 'react';
import './App.css';
import Filter from './Components/filter/Filter';
import WorldMap from './Components/WorldMap';
import Bar from './Components/Bar';
import Line from './Components/Line';
import PieChart from './Components/PieChart';
import RadarChart from './Components/RadarChart';
import ScatterPlot from './Components/ScatterPlot';

function App() {
  const [filter,setFilter] = useState("default");
  const [scrollPos, setScrollPos] = useState();
  const columnRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(columnRef.current.scrollTop);
      console.log(scrollPos);
    };

    if (columnRef.current) {
      columnRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (columnRef.current) {
        columnRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollPos, filter]);

  return (
    <div className="App">
      <Filter chooseFilter={chooseFilter} scroll={scrollPos} className="column-20"></Filter>
      <div ref={columnRef} className='column-80'>
        {filter==="default" &&
          <div className='about'>
            <h1>VDashboard</h1>
            <h6>Welcome to your premier destination for insightful charts spanning a myriad of topics across diverse countries. Our platform is designed to provide you with comprehensive visualizations that offer valuable insights into global trends, socio-economic indicators, cultural phenomena etc. Whether you're a researcher, student, policymaker, or simply curious about the world around you, we empower users to explore, understand, and engage with data-driven narratives shaping societies worldwide.</h6>
            <div className='chart'>
                <WorldMap filter={filter} width={400} height={250}/>
              </div>
          </div>
          
          
        }
        {filter==="Country" &&
        <div>
          <h3>Country</h3>
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
              <PieChart filter={filter} width={400} height={250}/>
              </div>
            </div>
            </div>
        }
        {filter==="Sector" &&
          <div>
            <h2>Sector</h2>
        <div className='section'>
          <div className='chart'>
          <RadarChart filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <ScatterPlot filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Line filter={filter} width={400} height={250}/>
          </div>
          <div className='chart'>
          <Bar filter={filter} width={400} height={250}/>
          </div>
        </div>
          </div>
        }
      </div>  
    </div>
  );
}

export default App;
