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

getArticleList(1,10,'타이틀')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

getArticle(6716)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

createArticle()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
        console.log(error.message);
    });

patchArticle(6714)
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