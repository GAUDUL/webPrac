import axios from 'axios';

export const checkLoginStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_NODEJS_API_URL}/`); // GET 요청
      return response.data.isLoggedIn; // 로그인 상태 반환
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
      return false;
    }
  };

  export const userLogin = async (id, pass) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_NODEJS_API_URL}/user/login`, {
        userId: id, // 객체 형태로 전달
        passWord: pass
      }, {
        withCredentials: true, // 쿠키 포함
      });
      return(response);
    } catch (error) {
      console.error('로그인 오류:', error); // 오류 로그 출력
    }
  };