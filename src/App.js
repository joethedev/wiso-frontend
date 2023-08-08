import axios from "axios"
import {useState, useEffect} from "react"

function App() {
  const [todo, setTodo] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8080//incomeTaxSlice/1')
    .then( res => {
      setTodo(res.data)
      console.log(res.data)
    })


    .catch(err => console.log(err))
  },[])
  return (
   <div>
    <h1>this is a test</h1>
    {todo.from}
   </div>
  );
}

export default App;
