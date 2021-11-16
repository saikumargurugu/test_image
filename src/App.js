import React, {useEffect,useState} from 'react'
import './App.css'
import icon from './assets/sort.png'

function App() {
  let [ApiData,setApiData] =useState([])
  useEffect(()=>{
      if (ApiData.entries && !ApiData.entries.length>0) {
      fetch('https://api.publicapis.org/entries').then((res)=>res.json()
      .then(data => setApiData(data)))
    .catch((err)=>console.log(err))
    }
  },[ApiData]);
  const removedata = (key, headingdata) =>{
    if (headingdata.indexOf(key)>0){
      headingdata.splice(headingdata.indexOf(key),1)
    } 
    return headingdata
  }
  const getkeys= data=>{
    let tableHeadings=[]
    if(ApiData.entries && ApiData.entries.length>0) tableHeadings=[...Object.keys(ApiData.entries[0])]
    tableHeadings=removedata('Link', tableHeadings)
    tableHeadings=removedata('Auth', tableHeadings)
    tableHeadings=removedata('HTTPS', tableHeadings)
    return tableHeadings
  }

const sortApiData =( key, ORDER ) =>{
  let appdata=ApiData.entries.sort((a,b)=>(a[key] > b[key]) ? 1 : -1)
  setApiData({
  ...ApiData,
    entries:appdata
  })
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
      className="tabclass">
        {console.log(getkeys())}
        <thead>
        <tr className="tabheadrow">{getkeys().map(key=>
        <th className="tabhead"
        > {key}
        <img src={icon} alt='^'
        onClick={()=>sortApiData(key)}
        
        className="img"/>
        </th>
        ) }</tr>
        </thead>
        <tbody
        
        >
        {ApiData.entries&& Array.isArray(ApiData.entries) && ApiData.entries.map(entry=>
          <tr className="tabdatarow">
              {getkeys().map(indkey=><td
              className='tablecol'
              >{entry[indkey]}</td>)}
            </tr>
          )} 
          </tbody>

      </table>
      </div>
    </div>
  )
}

export default App
