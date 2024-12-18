import { useEffect,useState } from "react"
import UserDetails from "../Component/Userdetails"

function App() {
  const [user, setUser] = useState([])
    useEffect(() => { 
      fetch('http://127.0.0.1:8000/users',{
        method: 'GET',
       })
       .then(response => response.json())
       .then(result=> setUser(result))
       
       .catch((error) => console.log('error',error))
    },[])

  return (
    <>
   <ul>{user.map((user)=>(
      <UserDetails key={user.id} {...user} /> 
   ))}
   </ul>
   
   </>
  )
}

export default App
