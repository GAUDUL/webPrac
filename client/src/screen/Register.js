import { useNavigate } from 'react-router-dom'; // 추가

function MainPage() {
  const navigate = useNavigate(); // navigate 훅 사용

  return (
    <div>
        <h1>Register</h1>
    </div>
  );
}

export default MainPage;
