const menuIcon = document.querySelector('.simbolo_hamburguesa');
const menuBurger = document.querySelector('.menu_nav')
const menuCerrar = document.querySelector('.cerrar')

menuIcon.addEventListener('click', function () {

    menuBurger.classList.toggle('menu_hidden');

});

menuCerrar.addEventListener('click', function () {

    menuBurger.classList.toggle('menu_hidden');
});


/* CARRITO */

const btwCart = document.querySelector('.contenedor-imagen-carrito');
const containerCartProducts = document.querySelector('.container-cart-products');
btwCart.addEventListener('click', () => {

    containerCartProducts.classList.toggle('hidden-cart');

})

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container_productos');

const empty_car = document.querySelector('.empty_car');
const emptyCartButton = document.querySelector('.empty_cart_button');
emptyCartButton.addEventListener('click', () => {
    allProducts = [];
    showHTML();
});

// JSON
const shopContent = document.querySelector('.container_productos');
const getProducts = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "producto";
        content.innerHTML = `
    <figure>
    <a href="detalleWomen.html">
         <img src="${product.img}" alt="" srcset="">
    </a>
    </figure>
<div class="info_product">
    <h2>${product.nombre}</h2>
    <p class="price">€ ${product.precio}</p>
    <button class="btn_add_cart">Añadir al carrito</button>
</div> `;

        shopContent.append(content);

    });
}
getProducts();

//variable de array de productos añadidos al carrito
let allProducts = []


const countProducts = document.querySelector('.cart-items-count');


productsList.addEventListener('click', e => {

    if (e.target.classList.contains('btn_add_cart')) {
        console.log(e.target.parentElement);
        const product = e.target.parentElement;
        const parentProduct = product.parentElement;
        const img = parentProduct.querySelector('figure img').src;


        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
            imagen: img,
        }

        console.log(infoProduct);

        const exists = allProducts.some(product => product.title === infoProduct.title);


        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    product.imagen;
                    return product;
                } else {
                    return product;
                }
            })
            console.log('esta');

            allProducts = [...products];
        }
        else {
            console.log('no esta');
            //si no estaba en nuestro carrito 
            allProducts = [...allProducts, infoProduct];

        }


        showHTML();

        console.log(allProducts);

        console.log(product.parentElement);

        console.log(img);
    }
})


// De esta manera, al hacer clic en el botón de eliminar se llamará a la función eliminarProducto, la cual eliminará el producto correspondiente del array allProducts y actualizará la vista del carrito llamando a showHTML.


rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-product')) {
        const producto = e.target.parentElement;
        console.log('entra');
        console.log(producto);
        const abuelo = producto.parentElement;
        console.log(abuelo);
        const product_title = abuelo.querySelector('.titulo-producto-carrito').textContent.trim();
        console.log('fuccciona');

        console.log(product_title);
        console.log(product_title.length);


        allProducts = allProducts.filter(
            product => product.title !== product_title);

        showHTML();
        console.log(allProducts);
    }



});

const showHTML = () => {

    if (allProducts.length == 0) {
        empty_car.style.display = 'block';
    } else {
        empty_car.style.display = 'none';
    }

    let total = 0;
    let totalOfProducts = 0;

    rowProduct.innerHTML = '';

    allProducts.forEach((product, index) => {
        const productoCreado = document.createElement('div');
        productoCreado.classList.add('cart-product');

        productoCreado.innerHTML =
            `<div class="info-cart-product">
            <span class="restar"> - </span>
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <span class="sumar"> + </span>
            <h3 class="titulo-producto-carrito">${product.title}</h3>
            <span class="precio-producto-carrito">${product.price}</span>
            <span class="imgen-carrito"><img src="${product.imagen}"></span>  
            <span class="delete-product">❌</span>
            </div>`


        let restar = productoCreado.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.quantity !== 1) {
                product.quantity--;
            }
            console.log(restar);
            showHTML();

        });


        let sumar = productoCreado.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.quantity++;

            console.log(sumar);
            showHTML();
        });

        rowProduct.append(productoCreado);

        total = total + parseInt(product.quantity * product.price.slice(1));

        totalOfProducts = totalOfProducts + product.quantity;


    })

    const valorTotal = document.querySelector('.total-pagar');
    
    valorTotal.innerText = `€ ${total}`;
    countProducts.innerText = totalOfProducts;
    console.log(valorTotal);
};


showHTML();