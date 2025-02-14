import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screen/Login'
import MainPage from './screen/MainPage'
import Register from './screen/Register'
import MyPage from './screen/MyPage'
import WordNote from './screen/WordNote'
import Community from './screen/Community'

function App() {
  return (
    //라우터 세팅
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/myPage" element={<MyPage/>}/>
        <Route path="/word" element={<WordNote/>}/>
        <Route path="/community" element={<Community/>}/>
      </Routes>
    </Router>
  );
}

export default App;
