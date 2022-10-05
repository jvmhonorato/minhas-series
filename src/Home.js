import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState({})
    const getData = async() => {
        const {data} = await axios.get('/api')
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])

    
    return(
        <>
        <h1>Home</h1>
        <pre>{JSON.stringify(data)}</pre>
        </>
    )
}

export default Home