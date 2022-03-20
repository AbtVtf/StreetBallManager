import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import Navbar from './Navbar';
import lscache from 'lscache'


const App = () => {
   let history = useHistory()
   const [name, setName] = useState('');
   const [pwd, setPwd] = useState('');
   const [users, setUsers] = useState();
   const [Rname, setRName] = useState('');
   const [Rpwd, setRPwd] = useState('');

   useEffect(()=>{
      fetch('http://localhost:8000/users/')
      .then(res => {
         return res.json()
     })
     .then(data => {
         setUsers(data)
     })
   },[])

   const handleLogin = () => {    
      users && users.forEach(element => {
         console.log(element.user)
         if(name === element.user && pwd === element.pass){

            
            // lscache.set("NA....")
            // localStorage.setItem('Name', name);
            // localStorage.setItem('Password', pwd);
            // localStorage.setItem('IsLogged', "yes")

            lscache.set('Name', name);
            lscache.set('Password', pwd);
            lscache.set('isLogged', "true")
            history.push("/");
         }}) 
      
   };
   const register = () => { 
      const account = { user:Rname, pass:Rpwd,id:uuidv1()}   
      fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(account)
            })
            .then(() => {
               setRName("")
               setRPwd("")
           })
      
   };
   
 

   return (
      <>
      <Navbar/>
      <div style={{display:"flex"}}>
      <div className="LoginForm">
         <h1>Username:</h1>
         <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <h1>Password:</h1>
         <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
         />
         <div>
            <button onClick={handleLogin}>Log In</button>        
         </div>
         {}
         
      </div>
      <div className="LoginForm">
         <h1>Register</h1>
         <h1>Username:</h1>
         <input
            placeholder="Name"
            value={Rname}
            onChange={(e) => setRName(e.target.value)}
         />
         <h1>Password:</h1>
         <input
            type="password"
            placeholder="Password"
            value={Rpwd}
            onChange={(e) => setRPwd(e.target.value)}
         />
         <div>
            <button onClick={register}>Register</button>        
         </div>
         {}
         
      </div>

      </div>
      </>

   );
};
export default App;