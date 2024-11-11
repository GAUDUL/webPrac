import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screen/Login'
import MainPage from './screen/MainPage'
import Register from './screen/Register'
import MyPage from './screen/MyPage'
import WordNote from './screen/WordNote'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/myPage" element={<MyPage/>}/>
        <Route path="/word" element={<WordNote/>}/>
      </Routes>
    </Router>
  );
}

export default App;
