import '../css/MainPage.css'
import { useNavigate } from 'react-router-dom'; // 추가
import {useEffect, useState} from 'react'
import { checkLoginStatus } from '../fetch/LoginRegister'
import MenuBar from '../component/MenuBar'

//메인 페이지
function Community() {
  const navigate = useNavigate(); // navigate 훅 사용
  const [user,setUser]=useState({name: ''})
  
  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkLoginStatus();
      if (data.isLoggedIn) {
        setUser(prev=>({...prev, name: data.userName}))
      }
      else{
        navigate('/')
      }
    };
    verifyLogin();
  }, [navigate]);

  return (
    <div className='MainPage'>
      <div className='block'>
        < MenuBar/>
      </div>
      <h1>MyWeb Community</h1>
    </div>
  );
}

export default Community;
