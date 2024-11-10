import axios from 'axios';

export const uploadProfile = async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_NODEJS_API_URL}/user/uploadProfileImage`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    return { success: false, message: '파일 업로드 실패' };
  }
};