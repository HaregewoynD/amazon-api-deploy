import React,{useContext,useEffect} from 'react'
import Routing from './Router.jsx';
import { DataContext } from './Components/DataProvider/DataProvider.jsx';
import { Type } from './Utility/actiontype.js';
import { auth } from './Utility/Firebase.js';

const App = () => {
  const[{user},dispatch]= useContext(DataContext)

useEffect(() => {
  auth.onAuthStateChanged((authUser)=>{

if(authUser){
   dispatch({
    type:Type.SET_USER,
    user:authUser
  });
}else{
      dispatch({
        type: Type.SET_USER,
        user: null,
      });
  } 
  });
},[]);

  return <Routing />;
  
}

export default App;