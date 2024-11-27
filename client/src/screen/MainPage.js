import '../css/MainPage.css'
import { useNavigate } from 'react-router-dom'; // 추가
import {useEffect, useState} from 'react'
import { checkLoginStatus, userLogout } from '../fetch/LoginRegister'
import MenuBar from '../component/MenuBar'

//메인 페이지
function MainPage() {
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

  //로그아웃
  const handleLogout = async () =>{
    userLogout()
    .then((response)=>{
      if(response.status===200){
        navigate('/')
      }
    })
  }

  return (
    <div className='MainPage'>
      <div className='block'>
        < MenuBar/>
      </div>
      <h1>어서오세요 {user.name}님!</h1>
    </div>
  );
}

export default MainPage;
