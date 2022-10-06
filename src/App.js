
import Home from "./Home";
import {BrowserRouter as Router, Routes, Route,useParams } from 'react-router-dom'
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.css'
import Generos from "./Generos";
import Lancamentos from "./Lancamentos";
import NewGenre from "./NewGenre";
import UpdateGenre from "./UpdateGenre";


function App() {
  const { id } = useParams();
  
  return (
    <div>
    <Router>
      <Header/>
       <Routes>

         <Route exact path="/" element={<Home/>}/>
         <Route exact  path="/generos" element={<Generos/>}/>
         <Route  exact path="/generos/novo" element={<NewGenre/>}/>
         <Route  exact path="/lancamentos" element={<Lancamentos/>}/>
         <Route  exact path="/generos/:id" element={<UpdateGenre/>}/>
         
       </Routes>
      </Router>
    </div>

  );
}

export default App;
