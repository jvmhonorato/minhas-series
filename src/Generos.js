import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';



const Generos = () => {
    
    const [data, setData] = useState({})
   const getData = async() => {
        try{
        const {data} = await axios.get('/api/genres')
        
        setData(data.data)
        }catch(err){
      }
     }
    useEffect(() => {
        getData()
    }, [])
  

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope="row" >{record.id}</th>
                <td >{record.name}</td>
                <td ><button>+</button></td>
            </tr>

        )
    }


    return(
      
            <div className="container">
                <h1>Gêneros</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col"> Name</th>
                        <th scope="col"> Ações</th>
                        </tr>
                    </thead>
                        <tbody>
                            {data.map(renderLine)}
                        </tbody>
                </Table>

                <pre>{JSON.stringify(data)}</pre>
             </div>
    
        
        )
    
}

export default Generos