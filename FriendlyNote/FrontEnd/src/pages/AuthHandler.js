import Axios from 'axios';


export function setAuthcredential(credential){

    localStorage.setItem('authCredential', credential);
}

export async function getAuthcredential(){
  const apiUrl = "http://localhost:8080/token";
  const axiosInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authCredential')}`
    }
  });
  try {
    const res = await axiosInstance.post(apiUrl);
    console.log(res.data)
    const { userId } = res.data.user;
    console.log(userId) // destructure the password and mail properties from the resolved data object
    return  res.data; 
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('authCredential');
  navigator.navigate('/login');
}

