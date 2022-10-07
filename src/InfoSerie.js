import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

const InfoSerie = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    
    const params = useParams()
    const id = params.id


    useEffect(() => {
        
        axios.get('/api/series/'+ id).then(res => {
            setData(res.data)
        })
     
    },[id])
    
    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage:`url('${data.background}')`,
        backgroundSize : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'

    }


    
    const onChange = (evt) =>{
        setName(evt.target.value)
    }
const save = () => {
    axios.post('/api/series', {
        name
    }).then(res => {
        console.log(res)
        setSuccess(true)
    })
}
if(success){
   return <Navigate to='/series'/>
}
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                      <div className='row h-100 align-items-center'>
                        <div className='col-3'>
                            <img className='img-fluid img-thumbnail' src={data.poster} alt=''/>
                        </div>
                        <div className='col-9'>
                            <h1 className='font-weight-light text-white'>{data.name}</h1>
                            <div className='lead text-white'>
                            <Badge pill bg="success">
                            Assistido
                             </Badge>{' '}
                            <Badge pill bg="warning">
                                Para assitir
                            </Badge>{' '}
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </header>
            <div  className='container'>
                <h1>Info Serie </h1>
               <pre>{JSON.stringify(data)}</pre>
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" value={name} onChange={onChange} className="form-control" id="name"placeholder='Nome do Gênero'/><br/>
                        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                    </div>
                    <br/>
                    <Nav.Link href="/series">Voltar</Nav.Link>
                </form>
              </div>
          </div>
      )
}
export default InfoSerie