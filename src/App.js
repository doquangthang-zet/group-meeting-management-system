import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AuthencationPage from './pages/AuthenticationPage/Authentication';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<AuthencationPage />} />
      </Routes>
    </div>
  );
}

export default App;
