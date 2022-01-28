import React from 'react';
import Search from '../components/Search';
import swal from 'sweetalert';
import { Button } from 'reactstrap';



const Home = () => {

  const HandleClick = () =>{ 
    
    swal("A wild Pikachu appeared! What do you want to do?", {
      buttons: {
        cancel: "Run away!",
        catch: {
          text: "Throw Pokéball!",
          value: "catch",
        },
        defeat: true,
      },
    })
    .then((value) => {
      switch (value) {
     
        case "defeat":
          swal("Pikachu fainted! You gained 500 XP!");
          break;
     
        case "catch":
          swal("Gotcha!", "Pikachu was caught!", "success");
          break;
     
        default:
          swal("Got away safely!");
      }
    });
  }
    return ( 

      <>
     
      <Search />
     
     
      <div style={{
            display: 'flex', justifyContent: 'center'
        }}>
     <Button 
     onClick={()=>HandleClick()}>Click me</Button>
     </div>
     
    </>
  
    );
}


export default Home;