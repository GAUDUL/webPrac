import '../css/Register.css';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'; // 추가
import { userRegister } from '../fetch/LoginRegister'

function Register() {
  const navigate = useNavigate();
  const [user, setUser] =useState({userName:'', userId:'',passWord:''});

  //회원가입 버튼
  const handleRegister = () => {
    console.log(user.userId);
    userRegister(user.userName, user.userId, user.passWord)
    .then((response) => {
      if(response.message==='중복'){
        //중복된 아이디라고 알리기
      }
      else if (response.status=== 200) { // 예시로 성공 여부를 체크
        navigate('/main'); // 메인 페이지로 이동
      } else {
        console.error('회원가입 실패'); // 실패 시 로그 출력
      }
    }).catch((error) => {
      console.error('회원가입 요청 오류:', error); // 에러 발생 시 출력
    });
  };

  return (
    <div className="Register">
      <h1 className="RegisterText">Register</h1>
      <div>
       <h2 className="RegisterBlankText">NickName</h2>
      <input className="RegisterBlank"
          type="text"
          value={user.userName}
          onChange={(e) => setUser(prev => ({ ...prev, userName: e.target.value }))}
          maxLength={10} // 최대 입력 길이를 10로 설정
      />
      </div>
      <div>
       <h2 className="RegisterBlankText">ID</h2>
      <input className="RegisterBlank"
          type="text"
          value={user.userId}
          onChange={(e) => setUser(prev => ({ ...prev, userId: e.target.value }))}
          maxLength={12} // 최대 입력 길이를 12로 설정
      />
      </div>
      <div>
      <h2 className="RegisterBlankText">Password</h2>
      <input className="RegisterBlank"
          type="password"
          value={user.passWord}
          onChange={(e) => setUser(prev => ({ ...prev, passWord: e.target.value }))}
          maxLength={18} // 최대 입력 길이를 18로 설정
      />
      </div>
      <button className="RegisterButton" onClick={handleRegister}> Register</button>
    </div>
  );
}

export default Register;
