
const getArticleList = (page, pageSize, keyword) => {
    
    console.log('함수시작');
    const response = fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((res) => {
        if(!res.ok){
            throw new Error('상태코드 : ' + res.status)
        }
        console.log('res받아오기 : ',res)
        return res.json();

    })
    .then((data) =>{
        console.log('data상태봐볼까 : ',data)
    } ) 

    .catch((error) => {
        console.log('에러발생')
        console.log(error.message);
    })
    

   
}


const getArticle = (id) =>{
    console.log('시작')
        const response = fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
        
     .then((res) => {
        if(!res.ok){
            throw new Error('상태코드 : ' + res.status)
        }
        console.log('res받아오기 : ',res)
        return res.json(); 
    })
    .then((data) =>{
        console.log('data상태봐볼까 : ',data)
    } ) 

    .catch((error) => {
        console.log('에러발생')
        console.log(error.message);
    })
    
 };

getArticle(6690);

const createArticle = (title, content, image) => {
    console.log('시작' )
    const response = fetch(`https://panda-market-api-crud.vercel.app/articles`, {
        method : 'POST',
        body : JSON.stringify(
            {title ,
            content,
            image}
        ),
        headers: {
            'content-Type' : 'application/json',
        },
    })
    .then( (res) => {
        console.log('상태코드 : ' , res.status);
        return res.json().then((data)=> {
            if(!res.ok){
            throw new Error('상태코드 : ' + data.message);
        }
         return data; })
                   })
    .then((data) =>{
        console.log('data상태봐볼까 : ',data)
    } ) 



    .catch((error) => {
        console.log('에러발생')
        console.log('-----------------')
       
        console.log('------------------')
        console.log(error.message);
        console.log('-------------------');
    })
    
};



const patchArticle =(id, title, content, image) => {
    fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
        method : 'PATCH',
        headers: {
  'Content-Type': 'application/json'
},
        body : JSON.stringify({
            title,
            content,
            image,
        })
        
        
    })
    .then((res) => {
        if(!res.ok){
            throw new Error('상태코드 : ' + res.status)
        }
        console.log('res받아오기 : ',res)
        return res.json();
        console.log('자손상태보기 : ',res.json())
    })
    .then((data) =>{
        console.log('data상태봐볼까 : ',data)
    } ) 

    .catch((error) => {
        console.log('에러발생')
        console.log(error.message);
    })
    

    
};


const deleteArticle = (id) => {
    fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
        method : 'DELETE',
    })
   .then((res) => {
        if(!res.ok){
            throw new Error('상태코드 : ' + res.status)
        }
        console.log('res받아오기 : ',res)
        return res.json();
        console.log('자손상태보기 : ',res.json())
    })
    .then((data) =>{
        console.log('data상태봐볼까 : ',data)
    } ) 

    .catch((error) => {
        console.log('에러발생')
        console.log(error.message);
    })
    
    
};

export default articleService;