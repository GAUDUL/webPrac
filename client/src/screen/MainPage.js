import '../css/MainPage.css'
import { useNavigate } from 'react-router-dom'; // 추가
import {useEffect, useState} from 'react'
import { checkLoginStatus } from '../fetch/LoginRegister'
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

    //이동
    const handleWordNote = ()=>{
      navigate('/word');
    }
  

  return (
    <div className='MainPage'>
      <div className='block'>
        < MenuBar/>
      </div>
      <h1>어서오세요 {user.name}님!</h1>

      <div className='button-container'>
        <button>테스트 보러가기</button>
        <button>그룹 만들기</button>
        <button>그룹 참여하기</button>
        <button onClick={handleWordNote}>나만의 단어장</button>
        <button>오답노트</button>
      </div>
    </div>
  );
}

export default MainPage;
