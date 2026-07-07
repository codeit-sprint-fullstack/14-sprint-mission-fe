import RegistForm from '../components/RegistForm.jsx';
import './Registration.css';
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios.jsx';

function Registration () {
  const navigate = useNavigate();

  const handleRegistForm = async (formData) => {
    const data = Object.fromEntries(formData.entries());

    try{
      const response = await axios.post('/tasks', data);
      const newItemSlug = response.data.id;  
      console.log(response.data.id);  
      console.log('보낼 데이터:', data);
      if (newItemSlug) {
        navigate(`/items/${newItemSlug}`);
        console.log('새로운 제품이 잘 등록되었습니다.');
      } 
    } catch (error) {
      console.error('상품 등록 중 에러 발생', error);
      console.error('error.message:', error.message);
      console.error('error.response:', error.response);
      console.error('error.request:', error.request);    
    }
  };

  

  return (
    <div className="register_wrap">
      <RegistForm onSubmit={handleRegistForm} />
    </div>
  );
}

export default Registration;