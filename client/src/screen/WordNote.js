import '../css/WordNote.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from '../fetch/LoginRegister';
import { wordConfirm, usersWord, wordDelete } from '../fetch/WordFetch'
import MenuBar from '../component/MenuBar';

function WordNote(){
    const navigate = useNavigate(); // navigate 훅 사용
    const [word, setWord] = useState({eng:'', mean:''});
    const [wordList, setWordList] = useState([]);

    useEffect(() => {
        const verifyLogin = async () => {
          const data = await checkLoginStatus();
          if (!data.isLoggedIn) navigate('/');
          else{
            const list = await usersWord();
            if(list.success){
                setWordList(list.words);
            }
          } 
        };
        verifyLogin();
      }, [navigate, setWordList]);

      //추가 버튼
    const handleConfirmButton = async ()=>{
        if(word.eng && word.mean){ 
            const confirmWord = await wordConfirm(word.eng, word.mean);
            if(confirmWord.success){
                const list = await usersWord();
                if(list.success){
                    setWordList(list.words);
                }
                setWord(prev=>({...prev, eng:'',mean:''}));
            }
            else{
                console.log('단어 저장 실패')
            }
        }
    }

    //삭제 버튼
    const handleDeleteButton = async (word)=>{
        const deleteWord=await wordDelete(word);
        if(deleteWord.success){
            const list=await usersWord();
            if(list.success){
                setWordList(list.words);
            }
        }
        else{
            console.log('단어 삭제 실패');
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
            <div className='block'></div>
            {/* 단어 목록 표 출력 */}
            <div className='wordTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Spelling</th>
                            <th>Meaning</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wordList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.spelling}</td>
                                <td>{item.meaning}</td>
                                <td><button onClick={() => handleDeleteButton(item.spelling)}>x</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default WordNote;