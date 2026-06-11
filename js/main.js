// 아티클
import article from "./articleService.js";

 import{
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct,
 } 
 
 from "./productService.js";


//article
const list = {
   
}
article.getArticleList()



//리스트불러오기
 getArticleList(1,1,1)
 
// 하나 불러오기
 getArticle(6671)

 // 글 작성
 createArticle(
    '제목',
    '내용',
    'https://example.com/...',
 )
 
 patchArticle(
    6671,
    '제목12',
    '내용12',
    'https://exam12ple.com/...'
 )

 deleteArticle(6671)
 



//product 
getProductList()
getProduct()
createArticle()
patchArticle()
deleteArticle()


//sign-in input 유효성검사
const in_email = document.querySelector('#email');
const in_password = document.querySelector('#password');
const password_error = document.querySelector('#password-error');
const email_error = document.querySelector('#email-error');
const btn_login = document.querySelector('.btn-login');

// sign-in 및 sign-in 페이지에서 로그인 버튼 클릭 시 alert 창 띄우기
const btn = document.querySelector('.btn-login');
const email = in_email.value.endsWith('@codeit.com');
const password = in_password.value.length >= 8;





// 이메일 유효성 검사
in_email.addEventListener('input', () => {
    if(in_email.value === '') {
        email_error.style.display = 'none';
    in_email.style.borderColor = '';}
        else if (in_email.value.endsWith('@codeit.com')){
            email_error.style.display = 'none';
            in_email.style.borderColor = '';
            
        }
        else {
            email_error.textContent = '잘못된 이메일 형식입니다';
            email_error.style.display = 'block';
            in_email.style.borderColor = 'red';
        }
});



        

// 비밀번호 유효성 검사
in_password.addEventListener('input', () => {
  if(in_password.value === '') {
        password_error.style.display = 'none';
    in_password.style.borderColor = '';}
        else if (in_password.value.length >= 8){
            password_error.style.display = 'none';
            in_password.style.borderColor = '';
        }
        else {
            password_error.textContent = '비밀번호는 8자 이상이어야 합니다';
            password_error.style.display = 'block';
            in_password.style.borderColor = 'red';
        }

})




in_email.addEventListener('blur',() => {
    if(in_email.value === '') {
        in_email.style.borderColor = 'red';
        email_error.style.display = 'block';
        email_error.textContent = '이메일을 입력하세요';
    } 
});


in_password.addEventListener('blur',() => {
    if(in_password.value === '') {
        in_password.style.borderColor = 'red';
        password_error.style.display = 'block';
        password_error.textContent = '비밀번호를 입력하세요';
    } 
});

if(email && password) {
    btn_login.style.backgroundColor = '#3692ff';
}