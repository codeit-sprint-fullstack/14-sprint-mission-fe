import { useState } from 'react';
import axios from '../utils/axios.js';
import "../css/Register.css"
import "../css/SubCommon.css"
import Button from "../component/Button.jsx"
import Input from "../component/Input.jsx"
import Textarea from '../component/Textarea.jsx';


function  Register() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const handleRegist = async()=>{
    const registData = await axios.post('/products', {
      name,
      info,
      price,
      tags
    })
    console.log(registData)
  }
  return(
    <div className="subPage registerWrap">
      <div className="inner">
        <div className="titleWrap">
          <div className="title">상품 등록하기</div>
          <Button variant='btnDisable' onClick={handleRegist}>등록</Button>
        </div>
        <section className="formWrap">
          <div className="formCont">
            <p className="formTitle">상품명</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} variant="formInput" type="text" placeholder='상품명을 입력해주세요' required/>
          </div>
          <div className="formCont">
            <p className="formTitle">상품 소개</p>
            <Textarea value={info} onChange={(e)=>setInfo(e.target.value)} variant="formTextarea" type="text" placeholder='상품 소개를 입력해주세요' required/>
          </div>
          <div className="formCont">
            <p className="formTitle">판매 가격</p>
            <Input value={price} onChange={(e)=>setPrice(e.target.value)} variant="formInput" type="number" placeholder='판매 가격을 입력해주세요' required/>
          </div>
          <div className="formCont">
            <p className="formTitle">태그</p>
            <Input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} variant="formInput" type="text" placeholder='태그를 입력해주세요'/>
            <div className="tagList">
              <div className="tagWrap">
                <p className="tagTxt">티셔츠</p>
                <Button variant='btnTagDel'></Button>
              </div>
              <div className="tagWrap">
                <p className="tagTxt">상의</p>
                <Button variant='btnTagDel'></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Register;