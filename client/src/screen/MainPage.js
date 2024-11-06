import { useNavigate } from 'react-router-dom'; // 추가
import {useEffect, useState} from 'react'
import { checkLoginStatus, userLogin } from '../fetch/LoginRegister'

function MainPage() {
  const navigate = useNavigate(); // navigate 훅 사용
  
  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkLoginStatus();
      console.log(isLoggedIn)
      if (isLoggedIn) {
        navigate('/main'); // 로그인 상태일 경우 메인 페이지로 이동
      }
      else{
        navigate('/')
      }
    };
    verifyLogin();
  }, [navigate]);

  return (
    <div>
        <h1>MainPage</h1>
    </div>
  );
}

export default MainPage;
