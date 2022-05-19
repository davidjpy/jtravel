import Axios from '../utils/Axios';
import useAuth from './useAuth';

const useRefreshToken = () => {

  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await Axios.post('account/auth/refresh/', {
      'refresh': localStorage.getItem('refresh_token'),
      withCredentials: true
    });
    setAuth(prev => {
      return { ...prev, accessToken: response.data.access }
    });
    return response.data.access;
  }
  return refresh;
}

export default useRefreshToken;