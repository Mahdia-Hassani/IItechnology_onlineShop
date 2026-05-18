let cart = JSON.parse(localStorage.getItem("ii-cart")) || [];

/* ================= CART ================= */

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = count;
  });
}

function addToCart(id) {
  if (typeof products === "undefined") return;

  const p = products.find((x) => x.id === id);

  if (!p) return;

  const item = cart.find((x) => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      ...p,
      qty: 1,
    });
  }

  localStorage.setItem("ii-cart", JSON.stringify(cart));
  updateCartCount();

  showToast("Added to cart");
}

/* ================= TOAST ================= */

function showToast(msg) {
  let t = document.getElementById("toastMini");

  if (!t) {
    t = document.createElement("div");

    t.id = "toastMini";
    t.className = "toast-mini";

    document.body.appendChild(t);
  }

  t.textContent = msg;

  t.classList.add("show");

  setTimeout(() => {
    t.classList.remove("show");
  }, 1800);
}

/* ================= PRODUCTS ================= */

let currentCat = "All";
let currentSearch = "";

function renderProducts(list) {
  const wrap = document.getElementById("productGrid");

  if (!wrap) return;

  if (!list.length) {
    wrap.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-secondary">
          No products found.
        </p>
      </div>
    `;

    return;
  }

  wrap.innerHTML = list
    .map(
      (p) => `
      <div class="col-sm-6 col-md-4 col-lg-3 reveal">
        <div class="product-card">

          <img
            src="${p.image}"
            alt="${p.name}"
            class="product-img"
          >

          <div class="product-body">

            <div class="product-cat">
              ${p.category}
            </div>

            <div class="product-name">
              ${p.name}
            </div>

            <div class="product-desc">
              ${p.desc}
            </div>

            <div class="product-price">
              $${p.price}
            </div>

            <div class="d-flex gap-2 mt-2">

              <button
                class="btn btn-glow flex-grow-1"
                onclick="addToCart(${p.id})"
              >
                Add
              </button>

              <button
                class="btn btn-outline-neon"
                onclick="openProductModal(${p.id})"
              >
                View
              </button>

            </div>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  setupReveal();
}

function applyFilters() {
  if (typeof products === "undefined") return;

  let list = [...products];

  if (currentCat !== "All") {
    list = list.filter((p) => p.category === currentCat);
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase();

    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  renderProducts(list);
}

/* ================= MODAL ================= */

function openProductModal(id) {
  const p = products.find((x) => x.id === id);

  if (!p) return;

  document.getElementById("modalImg").src = p.image;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalCat").textContent = p.category;
  document.getElementById("modalPrice").textContent = "$" + p.price;

  document.getElementById("modalAdd").onclick = () => {
    addToCart(p.id);

    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  };

  new bootstrap.Modal(document.getElementById("productModal")).show();
}

/* ================= REVEAL ================= */

function setupReveal() {
  const els = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  els.forEach((el) => observer.observe(el));
}

/* ================= THEME ================= */

function setupTheme() {
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    document.body.classList.add("light-mode");

    btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    btn.innerHTML = isLight
      ? `<i class="bi bi-moon-stars-fill"></i>`
      : `<i class="bi bi-sun-fill"></i>`;
  });
}

/* ================= NAVBAR ================= */

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (!nav) return;

  if (window.scrollY > 30) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

/* ================= BACK TO TOP ================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (!backTop) return;

  if (window.scrollY > 300) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  setupTheme();

  if (
    document.getElementById("productGrid") &&
    typeof products !== "undefined"
  ) {
    renderProducts(products);

    document.getElementById("searchInput")?.addEventListener("input", (e) => {
      currentSearch = e.target.value;

      applyFilters();
    });

    document.querySelectorAll(".cat-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".cat-pill")
          .forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        currentCat = btn.dataset.cat;

        applyFilters();
      });
    });
  }
});
