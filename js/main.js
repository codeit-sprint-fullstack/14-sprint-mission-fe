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


const pdList = await getProductList(1, 10, '');
console.log(pdList);

const pd = await getProduct(4079);
console.log(pd);

// const createPd = await createProduct('삭제 테스트', '삭제 테스트..', 1000000, ['화장품', '스킨/케어'], ['https://example.com/image.jpg', 'https://example.com/image2.jpg']);
// console.log(createPd);

const patchPd = await patchProduct(4075);
console.log(patchPd);

const deletePd = await deleteProduct();
console.log(deletePd);