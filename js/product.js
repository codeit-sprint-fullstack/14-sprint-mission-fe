// product
import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
} from './ProductService.js';

getProductList(1,20,'');

function setProduct(product) {


    let html = '';

    html += '<div class="product">';
    html += '    <input type="hidden" class="prduct_id" name="' + product.id + '">';
    html += '    <button type="button">';
    html += '        <div class="img_area">';
    html += '            <div class="img_wrap">';



    html += '                <img src="./images/Img_home_01.png" alt="">';
    html += '            </div>';
    html += '            <div class="img_wrap">';
    html += '                <img src="./images/Img_home_02.png" alt="">';
    html += '            </div>';
    html += '            <div class="img_wrap">';
    html += '                <img src="./images/Img_home_03.png" alt="">';
    html += '            </div>';



    html += '        </div>';
    html += '        <div class="text_area">';
    html += '            <div class="title_wrap">';
    html += '                <p class="pd_title name">' + product.name + '</p>';
    html += '                <span class="description">' + product.description + '</span>';
    html += '            </div>';
    html += '            <span class="price">' + product.price + '</span>';
    html += '            <div class="tag_wrap">';



    html += '                <span class="tag"></span>';



    html += '            </div>';
    html += '        </div>';
    html += '    </button>';
    html += '</div>';
}