const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = count;
  }
}


function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((product, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-6';
    colDiv.innerHTML = `
      <div class="card h-100">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.thumbnail}" class="" alt="${product.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">$${product.price}</p>
              <p class="card-text">Quantity: ${product.quantity || 1}</p>
              <div class="d-flex align-items-center gap-2 mb-2">
              <button class="btn btn-danger btn-sm mt-auto" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      </div>`;
    cartItems.appendChild(colDiv);
    total += (product.price * (product.quantity || 1));
  });

  totalAmount.textContent = total.toFixed(2);
}

function updateQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity = (cart[index].quantity || 1) + delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}


displayCart();

