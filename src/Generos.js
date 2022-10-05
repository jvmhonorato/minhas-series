import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';




const Generos = () => {
    
    const [data, setData] = useState([])
    const effectRan = useRef(false)
    const { id } = useParams();

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

   //UPDATE BUTTON ROUTE
   let navigate = useNavigate(); 
   const routeChange = () =>{ 
     let path = `/generos/novo`; 
     navigate(path);
   }

   //ADD BUTTON ROUTE
   let navigate2 = useNavigate();
   const routeChangeNewGenre = () =>{ 
    
     let path2 = `/generos/${Number(id) + 1}`; 
     navigate2(path2);
   }

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope="row" >{record.id}</th>
                <td >{record.name}</td>
                <td >
                    <button className="btn btn-danger" onClick={() => deleteGenre(record.id)}>Remover</button>
                    <button className="btn btn-primary"  onClick={routeChangeNewGenre}>Editar</button>
                    
                </td>
                </tr>

        )
    }
    //DELETE
    const deleteGenre = id => {
        axios
        .delete('/api/genres/' + id)
        .then(res => {
            //manege state to bring back data filter objects
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
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
                <br/>
                
                <button className="btn btn-success"  onClick={routeChange}>Add</button>
               
             </div>
    
        
        )
    
}

export default Generos