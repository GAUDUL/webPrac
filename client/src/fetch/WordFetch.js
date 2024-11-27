import axios from 'axios';

//확인
export const wordConfirm = async (eng, mean)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_NODEJS_API_URL}/word/add`,{
            spelling: eng,
            meaning: mean
          },{
            withCredentials: true,
          });
          return(response.data)
    }catch (error){
      console.log('단어 저장 오류: ',error);
    }

}

//조회
export const usersWord = async ()=>{
  try{
    const response = await axios.get(`${process.env.REACT_APP_NODEJS_API_URL}/word/lookUp`,{
      withCredentials:true
    });
    return(response.data);
  }catch(error){
    console.log('단어 조회 오류: ', error);
  }
}

//삭제
export const wordDelete = async(word)=>{
  try{
    const response = await axios.post(`${process.env.REACT_APP_NODEJS_API_URL}/word/delete`,{
      spelling: word
    },{
      withCredentials: true
    })
    return(response.data);
  }catch(err){
    console.log('단어 삭제 오류: ',err);
  }
}