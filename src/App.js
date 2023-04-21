import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Group from './components/Group'
import User from './components/User'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/group" element={<Group />}/>
        <Route path="/user" element={<User />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
