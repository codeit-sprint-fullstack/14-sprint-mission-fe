// article
import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
} from './ArticleService.js';

// product
import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
} from './ProductService.js';

getArticleList(1,20,'타이틀')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

getArticle(6714)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

// createArticle('내가만든타이틀', '내가만든설명글', 'https://example.com/')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log('error');
//         console.log(error.message);
//     });

patchArticle(6712)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

deleteArticle()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });