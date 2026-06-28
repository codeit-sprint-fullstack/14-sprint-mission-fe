import { useEffect, useState } from 'react';
import axios from '../utils/axios.js';
import "../css/Register.css"
import "../css/SubCommon.css"
import Button from "../component/Button.jsx"

function  Register() {
  return(
    <div className="subPage registerWrap">
      <div className="inner">
        <div className="titleWrap">
          <div className="title">상품 등록하기</div>
          <Button variant=''>등록</Button>
        </div>
        <section className="formWrap">
          
        </section>
      </div>
    </div>
  )
}

export default Register;