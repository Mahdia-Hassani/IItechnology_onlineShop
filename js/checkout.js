let cart = JSON.parse(localStorage.getItem("ii-cart")) || [];

function renderCheckoutSummary() {
  const itemsWrap = document.getElementById("checkoutItems");

  const subEl = document.getElementById("checkoutSub");
  const shipEl = document.getElementById("checkoutShip");
  const totalEl = document.getElementById("checkoutTotal");

  if (!itemsWrap) return;

  if (cart.length === 0) {
    itemsWrap.innerHTML = `
      <p class="text-secondary">
        Your cart is empty.
      </p>
    `;

    subEl.textContent = "$0.00";
    shipEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";

    return;
  }

  let subtotal = 0;

  itemsWrap.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.qty;

      subtotal += itemTotal;

      return `
        <div class="d-flex align-items-center gap-3 mb-3">

          <img
            src="${item.image}"
            alt="${item.name}"
            style="
              width:70px;
              height:70px;
              object-fit:cover;
              border-radius:10px;
            "
          >

          <div class="flex-grow-1">
            <div class="fw-semibold">
              ${item.name}
            </div>

            <small class="text-secondary">
              Qty: ${item.qty}
            </small>
          </div>

          <div class="fw-bold">
            $${itemTotal.toFixed(2)}
          </div>

        </div>
      `;
    })
    .join("");

  const shipping = subtotal > 0 ? 15 : 0;

  const total = subtotal + shipping;

  subEl.textContent = "$" + subtotal.toFixed(2);
  shipEl.textContent = "$" + shipping.toFixed(2);
  totalEl.textContent = "$" + total.toFixed(2);
}

/* ================= CHECKOUT FORM ================= */

function setupCheckoutForm() {
  const form = document.forms.checkoutForm;

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    document.getElementById("checkoutWrap").style.display = "none";

    document.getElementById("successMsg").style.display = "block";

    localStorage.removeItem("ii-cart");

    cart = [];
  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();

  setupCheckoutForm();
});
