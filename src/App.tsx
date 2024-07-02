import './App.css'
import axios from "axios";
import {FormEvent, useEffect, useState} from "react";

type Burger = {
  id:string,
  name:string,
  price:number
}
function App() {

 const [burgerMenu, setBurgerMenu] = useState<Burger[]>()

    const [price, setPrice] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");

  function getBurgerMenu(){
    axios.get("/api/menu")
        .then(response => setBurgerMenu(response.data))
        .catch(error => console.log(error))
  }

  function addNewMenu(){
     axios.post("/api/menu/add", {id:id, name:name, price:price})
         .then(response => console.log(response.data))
         .then(getBurgerMenu)
         .catch(error => console.log(error))
  }

  useEffect(() => {
      getBurgerMenu()
  }, [])

    function handleSubmit(e:FormEvent<HTMLFormElement>){
      e.preventDefault()
        addNewMenu()
        setPrice(0)
        setId("")
        setName("")
    }

  return (
    <>
        {burgerMenu ?
            burgerMenu?.map(burger => <h2>{burger.name}</h2>)
        :
        <p>Loading</p>}
       <form onSubmit={handleSubmit}>
           <label>
               ID:
               <input type={"text"} value={id} onChange={(e)=> setId(e.target.value)}/>
           </label>
           <label>
               Name:
               <input type={"text"} value={name} onChange={(e)=> setName(e.target.value)}/>
           </label>
           <label>
               Price:
               <input type={"number"} value={price} onChange={(e)=> setPrice(Number(e.target.value))}/>
           </label>
           <button>Submit</button>
       </form>
    </>
  )
}

export default App
