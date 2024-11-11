import axios from 'axios';

export const wordConfirm = async (eng, mean)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_NODEJS_API_URL}/word/add`,{
            spelling: eng,
            meaning: mean
          },{
            withCredentials: true,
          });
          return(response)
    }catch (error){
      console.log('단어 저장 오류: ',error);
    }

}