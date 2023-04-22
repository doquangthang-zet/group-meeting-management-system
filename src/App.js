import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Group from './components/Group'
import User from './components/User'
import Authentication from './pages/AuthenticationPage/Authentication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/group" element={<Group />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/" element={<Authentication />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
