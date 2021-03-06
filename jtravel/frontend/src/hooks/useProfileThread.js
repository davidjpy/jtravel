import useAuth from './useAuth';
import axiosInstance from '../utils/Axios';

const useProfileThread = () => {

  const { currentView, setProfileThread, setProfileThreadCounter } = useAuth();

  const getThread = async () => {

    const response = await axiosInstance.get(`api/${currentView}/`, 
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
    });
    setProfileThreadCounter(response.data.length);
    return response.data;
  };
  return getThread;
};

export default useProfileThread;