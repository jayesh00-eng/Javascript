const productDiv = document.getElementById("product-div");

let products = [];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.textContent = cart.length;
    if (cart.length === 0) {
      countEl.style.display = 'none';
    } else {
      countEl.style.display = 'block';
    }
  }
}

async function addtocart(i) {
  const product = {...products[i], quantity: 1};
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(p => p.id === product.id);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
 
 
 function displayProducts(products) {
  productDiv.className = ' row row-cols-lg-4 g-4';
  products.forEach((product,i) => {
   const colDiv = document.createElement("div");
   colDiv.className = "col";
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
  <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">$${product.price}</p>
    <button class="add-to-cart-btn btn btn-primary mt-auto w-100" onclick="addtocart(${i})">Add to cart</button>
  </div>`;
    colDiv.appendChild(cardDiv);
    productDiv.appendChild(colDiv);
  });
 }
 
async function fetchProducts() {
  const res= await fetch("https://dummyjson.com/products")
  const data= await res.json();
  console.log(data);
  products = data.products;
  data.products.forEach(p => p.id = p.id);
  displayProducts(data.products);
  updateCartCount();
 }

updateCartCount();
fetchProducts();
