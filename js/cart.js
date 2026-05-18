/* ================= CART PAGE ================= */

function renderCart() {
  const wrap = document.getElementById("cartList");
  const empty = document.getElementById("emptyMsg");

  const subEl = document.getElementById("cartSub");
  const shipEl = document.getElementById("cartShip");
  const totalEl = document.getElementById("cartTotal");

  if (!wrap) return;

  if (!cart.length) {
    wrap.innerHTML = "";

    if (empty) {
      empty.style.display = "block";
    }

    subEl.textContent = "$0.00";
    shipEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";

    return;
  }

  empty.style.display = "none";

  wrap.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="flex-grow-1">
        <div class="fw-semibold">
          ${item.name}
        </div>

        <div class="text-secondary small">
          ${item.category}
        </div>

        <div class="mt-1">
          $${item.price}
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">

        <button
          class="qty-btn"
          onclick="changeQty(${item.id}, -1)"
        >
          −
        </button>

        <span>${item.qty}</span>

        <button
          class="qty-btn"
          onclick="changeQty(${item.id}, 1)"
        >
          +
        </button>

      </div>

      <div class="fw-bold ms-3">
        $${(item.price * item.qty).toFixed(2)}
      </div>

      <button
        class="btn btn-sm text-danger ms-2"
        onclick="removeItem(${item.id})"
      >
        ✕
      </button>

    </div>
  `,
    )
    .join("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const shipping = subtotal > 0 ? 5 : 0;

  const total = subtotal + shipping;

  subEl.textContent = "$" + subtotal.toFixed(2);
  shipEl.textContent = "$" + shipping.toFixed(2);
  totalEl.textContent = "$" + total.toFixed(2);
}

/* ================= CHANGE QTY ================= */

function changeQty(id, amount) {
  const item = cart.find((x) => x.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter((x) => x.id !== id);
  }

  localStorage.setItem("ii-cart", JSON.stringify(cart));

  updateCartCount();

  renderCart();
}

/* ================= REMOVE ================= */

function removeItem(id) {
  cart = cart.filter((x) => x.id !== id);

  localStorage.setItem("ii-cart", JSON.stringify(cart));

  updateCartCount();

  renderCart();
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
