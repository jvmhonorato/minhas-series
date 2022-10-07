import React, { useState, useEffect,useRef } from "react";
import axios from "axios";

const Home = () => {
   
    const [data, setData] = useState([])
    const effectRan = useRef(false)

  useEffect(() => {
    if(effectRan.current === false){
    axios
    .get('/api/genres')
    .then(res => {
        setData(res.data.data)
    })
    return () => { 
        effectRan.current = true
    }
 }
  },[])

    
    return(
        <div className="container">
        <h1>Home</h1>
        <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}

export default Home