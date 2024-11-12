import '../css/MyPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from '../fetch/LoginRegister';
import { uploadProfile, updateProfile } from '../fetch/UserFetch';
import MenuBar from '../component/MenuBar';

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', profileImage: null });
  
  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkLoginStatus();
      if (data.isLoggedIn) {
        const userProfile = await updateProfile();
        setUser(prev=>({...prev, name:userProfile.userName, profileImage: userProfile.profileImage}))
      } else {
        navigate('/');
      }
    };
    verifyLogin();
  }, [navigate]);

  const handleWordNote = ()=>{
    navigate('/word');
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, profileImage: reader.result }));
        //FormData 생성
        const formData = new FormData();
        formData.append('profileImage', file);

        //서버 요청
        uploadProfile(formData)
        .then(data => {
          if (data.success) {
           console.log('파일 업로드 성공', data.profileImageUrl);
          } else {
            console.error('파일 업로드 실패', data.message);
          }
        })
        .catch(error => {
        console.error('서버 오류:', error);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return ( 
    <div className='MainPage'>
      <div className='block'>
        <MenuBar />
      </div>
      <h2>{user.name}</h2>
      <div className="profile-container">
        <div className="profile-wrapper">
          <img 
            src={user.profileImage || '/profile.png'} 
            alt="Profile" 
            className="profile-image" 
          />
          <label className="upload-button">
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <span className="upload-icon">+</span>
          </label>
        </div>
      </div>
      <button onClick={handleWordNote} >나만의 단어장</button>
      <button>이전 테스트 결과</button>
      <button>오답노트</button>
    </div>
  );
}

export default MyPage;
