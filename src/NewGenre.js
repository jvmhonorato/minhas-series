import React, {useState}  from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


const NewGenre = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = (evt) =>{
        setName(evt.target.value)
    }
const save = () => {
    axios.post('/api/genres', {
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
                <h1>Novo Gênero </h1>
                
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" value={name} onChange={onChange} className="form-control" id="name"placeholder='Nome do Gênero'/>
                        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                    </div>
                    
                </form>
          </div>
      )
}
export default NewGenre