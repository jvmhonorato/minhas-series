import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

const InfoSerie = () => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode,setMode] = useState('EDIT')
    const [genres, setGenres]= useState([])
    const params = useParams()
    const id = params.id
   


    //use two setStates
    useEffect(() => {
        
        axios
        .get('/api/series/'+ id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })
     
    },[id])

    useEffect(() => {
       
        axios
        .get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
        })
     
    },[])
    
    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage:`url('${data.background}')`,
        backgroundSize : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'

    }


    //use spread operator to take all forms, select "name"
    // use dinamyc key, put the firt funciton: field into of [field]
    const onChange = field => (evt) =>{
        setForm({
            ...form,
          [field]: evt.target.value
        })
    }


const save = () => {
    axios.put('/api/series/'+ id ,form)
    .then(res => {
        console.log(res)
        setSuccess(true)
    })
}
if(success){
  // return <Navigate to='/series'/>
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
                            Gênero: {data.genre_name}
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </header>
            <div>
                <button  className="btn btn-primary" onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {mode === 'EDIT' &&  
            <div  className='container'>
                <h1>Info Serie </h1>
               <pre>{JSON.stringify(form)}</pre>
               <button className="btn btn-danger" onClick={() => setMode('INFO')}>Cancelar a edição</button>
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name"placeholder='Nome da seire'/><br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Comentário</label>
                        <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="name"placeholder='Comentários'/><br/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="name">Gênero</label>
                    <select className="form-control" onChange={onChange('genre_id')}  >
                        {genres.map(genre => <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>)}
                        
                        </select>
                    </div>
                    <br/><br/>
                    <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                    <br/><br/>
                    <Nav.Link className="btn btn-warning" href="/series">Voltar</Nav.Link>
                    <br/><br/>
                </form>
              </div>
              }
          </div>
      )
}
export default InfoSerie