import React, {useState, useEffect, useRef}  from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';


const UpdateGenre = (props) => {
    const params = useParams(); 
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const effectRan = useRef(false)
    const id = params.id; 
    

    useEffect(() => {
        if(effectRan.current === false){
        axios.get('/api/genres/'+ id)
        .then(res => {
            setName(res.data.name)
            
        })
        return () => { 
            
            effectRan.current = true
        }
     }
    },[id])
       console.log(props)

    const onChange = (evt) =>{
        setName(evt.target.value)
    }
const save = () => {
    axios.put('/api/genres/'+ id, {
        name
    }).then(res => {
        console.log(res)
        setSuccess(true)
    })
}
if(success){
   return <Navigate to='/generos'/>
}
    return (
        <div className='container'>
                <h1>Editar Gênero </h1>
               
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" value={name} onChange={onChange} className="form-control" id="name"placeholder='Nome do Gênero'/><br/>
                        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                    </div>
                    <br/>
                    <Nav.Link href="/generos">Voltar</Nav.Link>
                </form>
                
          </div>
      )
}
export default UpdateGenre