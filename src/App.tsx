import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Board from "./components/Board/Board";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const {currentUser} = useAuth();
  return (
    <Routes>
      <Route path="/" element={currentUser?<Board/>:<Navigate to="/login"/>} />
        <Route path="/login" element={currentUser?<Navigate to="/"/>:<Login/>} />
        <Route path="/signup" element={currentUser?<Navigate to="/"/>:<Signup/>} />
    </Routes>
  );
}

export default App;
