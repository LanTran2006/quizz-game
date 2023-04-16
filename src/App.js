import './App.scss';
import Game from './pages/Game';
import Start from './pages/Start';
import { useState } from 'react';
function App() {
   const [name,setName]=useState(null);

  return (
   <>
    {name ? <Game name={name} setName={setName}/> : <Start setName={setName}/>}
   </>
  );
}

export default App;
// {name ? <Game/> : <Start setName={setName}/>}