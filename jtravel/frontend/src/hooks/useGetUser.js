import useAuth from './useAuth';
import axiosInstance from '../utils/Axios';

const useGetUser = () => {

  const { setAuth } = useAuth();
  const id = localStorage.getItem('user_id')

  const getUser = async () => {
    const response = await axiosInstance.get(`account/auth/user/${id}`, 
    {
      headers: 
      {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    setAuth(prev => {
      return {
        ...prev, user: response.data
      };
    });
    return response.data;
  }
  return getUser;
};

export default useGetUser;