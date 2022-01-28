import React from 'react';
import Header from '../components/Header'; 

const NotFound = () => {


  return (
     
    <>
          <Header/>

          <section className="error">
              <div className="error_main">
                  <h1 className="animated pulse">Error 404</h1>
                  <label>Página no encontrada</label>
              </div>
          </section>
    </>
     
  )
}
export default NotFound;