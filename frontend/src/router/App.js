import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../containers/Home';
import Estadisticas from '../containers/Estadisticas';
import Formulario from '../containers/Formulario';
import NotFound from '../containers/NotFound';
import Layout from '../components/Layout';

const App = () => (

<Layout>
        <Routes >     
           <Route exact path="/" element={<Home />} />
           <Route exact path="/estadisticas/:address" element={<Estadisticas />} />
           <Route exact path="/formulario" element={<Formulario />} />
           <Route       path="*"  element={<NotFound />}/>
        </Routes> 
</Layout>
)

export default App;