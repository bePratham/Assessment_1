import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Protected from "./components/Protected";
import Public from "./components/Public";


function App() {
  const {isLogin,token}=useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isLogin?<Protected token={token}/>:<Public/>} />
       </Routes>
  );
}

export default App;
