import '../css/Login.css';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'; // 추가
import { checkLoginStatus, userLogin } from '../fetch/LoginRegister'

function Login() {
  const navigate = useNavigate();
  const [user, setUser] =useState({userId:'',passWord:''});

   // 로그인 상태 확인
  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkLoginStatus();
      // if (data.isLoggedIn) {
      //   navigate('/main'); // 로그인 상태일 경우 메인 페이지로 이동
      // }
    };
    verifyLogin();
  }, [navigate]);

  //로그인 버튼
  const handleLogin = () => {
    userLogin(user.userId, user.passWord)
    .then((response) => {
      if (response.status=== 200) { // 예시로 성공 여부를 체크 (서버 응답에 따라 다름)
        navigate('/main'); // 메인 페이지로 이동
      } else {
        console.error('로그인 실패'); // 실패 시 로그 출력
      }
    }).catch((error) => {
      console.error('로그인 요청 오류:', error); // 에러 발생 시 출력
    });
  };

  //등록 버튼
  const handleRegister = () =>{
    navigate('/register'); // 메인 페이지로 이동
  }

  // Enter 키를 눌렀을 때 Login 버튼 클릭 처리
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
  }  

  return (
    <div className="Login">
      <h1 className="LoginText">Login</h1>
      <div>
       <h2 className="LoginBlankText">ID</h2>
      <input className="LoginBlank"
          type="text"
          value={user.userId}
          onChange={(e) => setUser(prev=>({...prev, userId: e.target.value }))}
          maxLength={12} // 최대 입력 길이를 12로 설정
          onKeyDown={handleKeyPress} // Enter 키를 누르면 처리
      />
      </div>
      <div>
      <h2 className="LoginBlankText">Password</h2>
      <input className="LoginBlank"
          type="password"
          value={user.passWord}
          onChange={(e) => setUser(prev=>({...prev,passWord: e.target.value }))}
          maxLength={18} // 최대 입력 길이를 18로 설정
          onKeyDown={handleKeyPress} // Enter 키를 누르면 처리
      />
      </div>
      <button className="LoginButton" onClick={handleLogin}> Login </button>
      <button className="LoginButton" onClick={handleRegister}> Register</button>
    </div>
  );
}

export default Login;
