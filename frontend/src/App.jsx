import Login from "./Pages/Login"
import Registeration from "./Pages/Registeration"
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useAuthContex } from "./contex/AuthContex";
import Home from "./Pages/Home";

const App = () => {
  const {authUser}=useAuthContex();
  return (
     <Router>
       <Routes>
          <Route path="/" element={authUser ? <Home/> :  <Navigate to="/login"/> }/>
          <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Registeration/>}/>
      </Routes>
     </Router>
  
  )
}

export default App
