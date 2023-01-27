import axios from 'axios';
import { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppR from './routes/AppR';



function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "");

  return (
    <div className="App">
      <AppNav user={user} setUser={setUser}   />
      <AppR user={user} setUser={setUser} />


    </div>
  );
}

export default App;
