
  export function useProductValidation({ name, description, price, tags }) {                                          
    const errors = {                                                                                                    
      name:
        name.length > 10 ? "상품명은 10자 이내로 입력해 주세요" : "",                                                   
      description:                                                                                                      
        description.length > 0 && description.length < 10
          ? "상품 소개는 10자 이상 입력해 주세요"                                                                       
          : description.length > 100                                                                                    
          ? "상품 소개는 100자 이내로 입력해 주세요"
          : "",                                                                                                         
      price:                                                                                                          
        price.length > 0 && !/^\d+$/.test(price)
          ? "판매 가격은 숫자로 입력해 주세요"                                                                          
          : "",                                                                                                         
      tags: tags.some((t) => t.length > 5)                                                                              
        ? "태그는 5글자 이내로 입력해 주세요"                                                                           
        : "",                                                                                                           
    };
                                                                                                                        
    const isValid =                                                                                                   
      name.length >= 1 && name.length <= 10 &&
      description.length >= 10 && description.length <= 100 &&
      price.length >= 1 && /^\d+$/.test(price) &&                                                                       
      tags.length > 0 && tags.every((t) => t.length <= 5);
                                                                                                                        
    return { errors, isValid };                                                                                       
  }                                 