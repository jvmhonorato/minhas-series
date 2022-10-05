import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';



const Generos = () => {
    
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

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope="row" >{record.id}</th>
                <td >{record.name}</td>
                <td ><button>+</button></td>
            </tr>

        )
    }

    if (data.length === 0){
        return(
            <div>
                <h1>Gêneros</h1>
                <div className="alert alert-warning" role='alert'>
                    Você não possui gêneros criados!
                </div>
            </div>
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