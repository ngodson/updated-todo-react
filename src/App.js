import React, {useState, useEffect} from "react";
import {Form} from "./components/Form"
import './App.css';
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=> {
      setIsLoading(true)
      setTimeout(()=>{
        setIsLoading(false)
      },4000)
    },[])
  return (
    <div className="App">
      
      {  isLoading ? (
       <div className="loader"> <PropagateLoader
        color={"white"}
        loading={isLoading}
        size={15}
       
      /> </div>
      )  : 
      (
        <Form />
      )  
      }
      
      
    </div>
  );
}

export default App;
