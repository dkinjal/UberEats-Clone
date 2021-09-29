//import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import axios from 'axios'
import Car from './components/Navbar'
function App() {
  const[registerUsername, setRegisterUsername] = useState("");
  const[registerPassword, setRegisterPassword] = useState("");
  const[loginUsername, setLoginUsername] = useState("");
  const[loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  
  async function login (){
    axios.post('http://localhost:4001/login', {
      username: loginUsername,
      password: loginPassword
    },{withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };
  
  async function register (){
    axios.post('http://localhost:4001/register', {
      username: registerUsername,
      password: registerPassword
    },{withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  async function getUser (){
    axios.get('http://localhost:4001/user',{withCredentials: true})
    .then(function (response) {
      setData(response.data);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };
  
  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
        <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
        <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>

    
  );
}

export default App;
