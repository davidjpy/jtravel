import useAuth from './useAuth';
import axiosInstance from '../utils/Axios';

const useProfileThread = () => {

  const { setProfileThread } = useAuth();

  const getThread = async () => {

    const response = await axiosInstance.get('api/thread/', 
    {
      headers: 
      {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    });
    setProfileThread(prev => {
      return {
        ...prev, profilethread: response.data
      };
    })
    return response.data;
  };
  return getThread;
};

export default useProfileThread;