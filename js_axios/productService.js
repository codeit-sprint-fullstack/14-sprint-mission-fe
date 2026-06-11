export const getProductList = async (page, pageSize, keyword) => {
    try{
    const res = await fetch(`https://panda-market-api-crud.vercel.app/Products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    console.log(res.status)
    if(!res.ok){
        throw new Error("상태코드 : "+res.status)
    }

const data = await res.json();
console.log(data);
return data;
}

catch(error){
    console.log('에러확인')
    console.log('---------')
    console.log(error.message)
    
}
};

const response = await fetch(`https://panda-market-api-crud.vercel.app/Products/${id}`);

export const getProduct = async (id) =>{
    try{
    response = await fetch(`https://panda-market-api-crud.vercel.app/Products/${id}`)
    console.log('응답 : ',res);
     if(!res.ok){
        throw new Error("상태코드 : "+res.status)
    }
    const data = await res.json();
    console.log('데이터 : ', data);
    return data;
}

catch(error){
    console.log('에러확인')
    console.log('---------')
    console.log(error.message)
    
}
}

export const createProduct = async (images,tags,price,name,description) => {
    try{
    const res = await fetch(`https://panda-market-api-crud.vercel.app/Products/`,
        {
            method : "POST",
            headers: {
            'content-Type' : 'application/json',
        },
            body: JSON.stringify({
                images,
                tags,
                price,
                name,
                description,
            })
        }
    )
     if(!res.ok){
        throw new Error("상태코드 : "+res.status)
    }
    console.log('확인 : ' ,res);
    const data =await res.json();
    console.log('데이터확인 : ' ,data)
    return data;
    }
    
catch(error){
    console.log('에러확인')
    console.log('---------')
    console.log(error.message)
    
}
}
export const patchProduct = async (id,images,tags,price,name,description) => {
    try{
    const res = await fetch(`https://panda-market-api-crud.vercel.app/Products/${id}`,
        {
            method : "PATCH",
            headers: {
            'content-Type' : 'application/json',
        },
            body: JSON.stringify({
                images,
                tags,
                price,
                name,
                description,
            })
        }
    )
    console.log('응답 확인 : ',res.status)
     if(!res.ok){
        throw new Error("상태코드 : "+res.status)
    }
    const data = await res.json();
    console.log('데이터 확인 : ',data);
    return data;
}
catch(error){
    console.log('에러확인')
    console.log('---------')
    console.log(error.message)
    
}
}


export const deleteProduct = async (id) =>{
    try{
    const res = await fetch(`https://panda-market-api-crud.vercel.app/Products/${id}`,{
        method : "DELETE"
    })
     if(!res.ok){
        throw new Error("상태코드 : "+res.status)
    }
    const data =await res.json();
    console.log('삭제완료 ')
    return data.status;
}
    
catch(error){
    console.log('에러확인')
    console.log('---------')
    console.log(error.message)
    
}
}

const article = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

