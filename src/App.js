import React, {useEffect,useState} from 'react'
import './App.css'
function App() {
  let [ApiData,setApiData] =useState([])
  useEffect(()=>{
  console.log(ApiData?.entries);
      if (ApiData.entries && !ApiData.entries.length>0) {
      fetch('https://api.publicapis.org/entries').then((res)=>res.json()
      .then(data => setApiData(data)))
    .catch((err)=>console.log(err))
    }
  },[ApiData]);
  
  const getkeys= data=>{
    let rd=[]
    if(ApiData.entries && ApiData.entries.length>0) rd=[...Object.keys(ApiData.entries[0])]
    console.log(rd);
    return rd
  }
  return (
    <div className="body">
      <h1>Products</h1>
      <br/>
      <div
      className='tableclass'
      >
      <table
      cellSpacing='2' 
      style={{
        // border:'1px solid black'
      }}>
        {console.log(getkeys())}
        <tr style={{
        border:'1px solid black'
      }} >{getkeys().map(key=><th style={{
          justifyContent:'center',
          marginBottom:'1em'
          
        }} > {key}</th>) }</tr>
        {ApiData.entries&& Array.isArray(ApiData.entries) && ApiData.entries.map(entry=>
          <tr>
              {getkeys().map(indkey=><td>{entry[indkey]}</td>)}
            </tr>
          )} 
      </table>
      </div>
    </div>
  )
}

export default App
