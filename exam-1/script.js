const productDiv = document.getElementById("product-div");
const apikey = "https://dummyjson.com/products";

let products = [];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count ;
  }
}

function addtocart(index) {
  const product = products[index];
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(p => p.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function getProducts() {
  fetch(apikey)
    .then(response => response.json())
    .then(data => {
      products = data.products;
      productDiv.className = "row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4";
      products.forEach((product, index) => {
        const productCard = `
          <div class="col">
            <div class="card h-100">
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" ">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text flex-grow-1">${product.description}</p>
                <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary mt-auto" onclick="addtocart(${index})">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
        productDiv.innerHTML += productCard;
      });
      updateCartCount();
    })
}       
getProducts();        
