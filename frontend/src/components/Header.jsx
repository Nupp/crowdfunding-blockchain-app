import React from 'react';
import logo from '../assets/static/logo_Blockchain.png';
import '../assets/style/Header.scss';

const Header = () => {
  

          return(
          
          <div className="header">
              <ul className='header__menu_ul'>
                
              <a href="/">          
                    <img className="header__img" src={logo} alt="BlockChain" />             
               </a>

              
              
               
                
                   <li>
                    
                      <a href='/formulario'>Formulario</a>
                   
                    </li>
                    <li>
                      <a href='/estadisticas'>Estadistica</a>
                    
                    </li>
              </ul> 
       
          </div>
        );
      }


export default Header;
