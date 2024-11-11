import '../css/WordNote.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from '../fetch/LoginRegister';
import {wordConfirm} from '../fetch/WordFetch'
import MenuBar from '../component/MenuBar';

function WordNote(){
    const navigate = useNavigate(); // navigate 훅 사용
    const [word, setWord] = useState({eng:'', mean:''});

    useEffect(() => {
        const verifyLogin = async () => {
          const data = await checkLoginStatus();
          if (!data.isLoggedIn) navigate('/');
          else{

          }
        };
        verifyLogin();
      }, [navigate]);

    const handleConfirmButton = ()=>{
        const confirmWord = wordConfirm(word.eng, word.mean);
        if(confirmWord.success){
            console.log('단어 저장 성공')
        }
        else{
            console.log('단어 저장 실패')
        }
    }
      
    return(
        <div>
            <div className='block'>
                <MenuBar/>
            </div>
            <h2 style={{ textAlign: 'center' }}>Add Your Word!</h2>
            <div className='WordNote'>
            <h3 style={{ wordSpacing: '210px' }}>Spelling Meaning</h3>
            </div>
            <div className='WordNote'>
                <input className='wordBlank'
                    type="text"
                    value={word.eng}
                    onChange={(e) => setWord(prev=>({...prev, eng: e.target.value }))}>
                </input>
                <input className='wordBlank'
                    type="text"
                    value={word.mean}
                    onChange={(e) => setWord(prev=>({...prev, mean: e.target.value }))}>
                </input>
            </div>
            <div style={{textAlign: 'center', marginBottom:'20px' }}>
                <button className='confirmButton' onClick={handleConfirmButton}>confirm</button>
            </div>
                <div className='block'>
            </div>
        </div>
    );
    
}

export default WordNote;