import {useState,useEffect} from 'react';
import './App.css';

function App() {
  // const [data,setData]= useState({
  //   end_year: "",
  //   intensity: "",
  //   sector: "",
  //   topic: "",
  //   insight: "",
  //   url: "",
  //   region: "",
  //   start_year: "",
  //   impact: "",
  //   added: "",
  //   published: "",
  //   country: "",
  //   relevance: "",
  //   pestle: "",
  //   source: "",
  //   title: "",
  //   likelihood: ""
  // }
  // )
  
  // useEffect(()=>{
  //   fetch("/").then((res)=>
  //   res.json().then((data) =>{
  //     setData({
  //       end_year: data.end_year,
  //       intensity: data.intensity,
  //       sector: data.sector,
  //       topic: data.topic,
  //       insight: data.insight,
  //       url: data.url,
  //       region: data.region,
  //       start_year: data.start_year,
  //       impact: data.impact,
  //       added: data.added,
  //       published: data.published,
  //       country: data.country,
  //       relevance: data.relevance,
  //       pestle: data.pestle,
  //       source: data.source,
  //       title: data.title,
  //       likelihood:data.likelihood,
  //     });
  //   })
  //   );
  // },[]);
  const [data,setData]= useState({
    end_year: "",
    intensity: "",
    sector: "",
    topic: "",
    insight: "",
    url: "",
    region: "",
    start_year: "",
    impact: "",
    added: "",
    published: "",
    country: "",
    relevance: "",
    pestle: "",
    source: "",
    title: "",
    likelihood: ""
  }
  )
  
  useEffect(()=>{
    fetch("/").then((res)=>
    res.json().then((data) =>{
      setData({
        end_year: data.end_year,
      });
      console.log(data.end_year);
    })
    );
  },[]);
  return (
    <div className="App">
      <h1>VDashboard</h1>
      <p>{data.end_year}</p>
    </div>
  );
}

export default App;
