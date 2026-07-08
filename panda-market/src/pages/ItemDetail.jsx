import axios from '../utils/axios.js';
import { useParams } from "react-router-dom";
function ItemDetail(){
  const params = useParams()
  console.log(params)
  return (
    <div>아이템 상세</div>
  )
}

export default ItemDetail