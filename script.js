let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name:'Statue',
    tag:'statue',
    price:2000,
    inCart:0
  },
  {
    name:'Statue2',
    tag:'statue2',
    price:20,
    inCart:0
  },
  {
    name:'Statue3',
    tag:'statue3',
    price:200,
    inCart:0
  },
  {
    name:'Statue4',
    tag:'statue4',
    price:2,
    inCart:0
  },
  {
    name:'Statue5',
    tag:'statue5',
    price:2000,
    inCart:0
  }


];
for(let i=0; i<carts.length; i++){
  carts[i].addEventListener('click',() =>{
    cartNumbers(products[i]);
    totalCost(products[i])
    })
}
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }

}
function cartNumbers(product, action){
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(action == "decrease"){
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers -1;
  }
  else if ( productNumbers ) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers +1;

  }else{
      localStorage.setItem("cartNumbers", 1);
      document.querySelector('.cart span').textContent = 1;
  }



  setItems(product);
}
function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  console.log("my cartitems are", cartItems);

  if(cartItems != null){
    if(cartItems[product.tag] == undefined){
      cartItems ={
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems ={
      [product.tag]: product
    }

  }


  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product, action){
  //console.log("The price is", product.price);
  let cartCost = localStorage.getItem('totalCost');

  console.log('cart cost',cartCost);
  console.log(typeof cartCost);
  if(action == 'decrease'){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - product.price);
  }
  else if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else{
    localStorage.setItem("totalCost", product.price);
  }



}
function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');

  //console.log(cartItems);
  if(cartItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="c">
      <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img src="${item.tag}.png">
        <span> ${item.name}</span>
        </div>
        <div class="price">${item.price}</div>
        <div class="quantity">
        <ion-icon  class="decrease" name="chevron-back-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="chevron-forward-circle-outline"></ion-icon>
        </div>
        <div class="total">
        $${item.inCart * item.price}
        </div>
        </div>

      `
    });

    productContainer.innerHTML +=`
    <div class="basketTotalContainer">
    <h5 class="basketTotalTitle">
    Basket totalCost
    </h5>
    <h4 class="basketTotal">
    $${cartCost}
    </h4>


    `;


  }

  deleteButtons();
  manageQuantity();
}
function deleteButtons(){
  let deleteButtons = document.querySelectorAll('.product ion-icon');
  let productName;
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let cartCost= localStorage.getItem('totalCost');

  for(let i=0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', () => {
      productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
      console.log(productName);

      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
      localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

      delete cartItems[productName];
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity(){
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');

  let cartItems = localStorage.getItem('productsInCart');
  let currentQuantity=0;
  let currentProduct="";
  cartItems= JSON.parse(cartItems);
  console.log(cartItems);

  for(let i=0; i< decreaseButtons.length; i++){
    decreaseButtons[i].addEventListener('click' ,() =>{
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '');
      console.log(currentProduct);
      if(cartItems[currentProduct].inCart >1){
      cartItems[currentProduct].inCart -= 1;
      cartNumbers(cartItems[currentProduct], "decrease");
      totalCost(cartItems[currentProduct], "decrease");
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();
    }
    });
  }
    for(let i=0; i< increaseButtons.length; i++){
      increaseButtons[i].addEventListener('click' ,() =>{
        currentQuantity = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '');
        console.log(currentQuantity);

        currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '');
        console.log(currentProduct);
        cartItems[currentProduct].inCart += 1;
        cartNumbers(cartItems[currentProduct]);
        totalCost(cartItems[currentProduct]);
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
      })
  }
}

onLoadCartNumbers();
displayCart();
