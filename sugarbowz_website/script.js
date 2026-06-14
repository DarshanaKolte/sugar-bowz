const phone = "919876543210";

const menu = [
  {
    name: "Signature Celebration Cake",
    cat: "cakes",
    price: "Custom price",
    desc: "Elegant eggless cakes for birthdays, anniversaries and milestones.",
    icon: "Cake"
  },
  {
    name: "Chocolate Truffle Cake",
    cat: "cakes",
    price: "From ₹899",
    desc: "Rich chocolate layers with smooth premium finish.",
    icon: "Truffle"
  },
  {
    name: "Customized Logo Cookies",
    cat: "gifting",
    price: "From ₹60/pc",
    desc: "Perfect for corporate gifting, events and party favours.",
    icon: "Cookies"
  },
  {
    name: "Brownie Box",
    cat: "desserts",
    price: "From ₹499",
    desc: "Fudgy brownies packed beautifully for gifting and cravings.",
    icon: "Brownies"
  },
  {
    name: "Dessert Jars",
    cat: "desserts",
    price: "From ₹149",
    desc: "Layered eggless dessert jars in crowd-favourite flavours.",
    icon: "Jars"
  },
  {
    name: "Luxury Hamper",
    cat: "gifting",
    price: "Custom price",
    desc: "Curated festive and corporate hampers with premium packaging.",
    icon: "Hamper"
  }
];

let cart = [];

const grid = document.getElementById("menuGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const sendOrder = document.getElementById("sendOrder");
const cartPanel = document.getElementById("cartPanel");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const cursorGlow = document.querySelector(".cursor-glow");
const year = document.getElementById("year");

function removeLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}

function render(items = menu) {
  if (!grid) return;

  grid.innerHTML = items
    .map((item) => {
      const originalIndex = menu.findIndex((m) => m.name === item.name);

      return `
        <article class="product-card reveal show">
          <div class="product-img">${item.icon}</div>
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="product-bottom">
              <span class="price">${item.price}</span>
              <button class="add" data-index="${originalIndex}">Add to order</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".add").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.index));
    });
  });
}

function addToCart(index) {
  cart.push(menu[index]);
  updateCart();

  if (cartPanel) {
    cartPanel.classList.add("open");
  }
}

function updateCart() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
            <div class="cart-item">
              <strong>${item.name}</strong><br>
              <span>${item.price}</span>
            </div>
          `
        )
        .join("");
    }
  }

  if (sendOrder) {
    const text =
      cart.length > 0
        ? "Hi SugarBowz, I want to order: " + cart.map((item) => item.name).join(", ")
        : "Hi SugarBowz, I want to place an order.";

    sendOrder.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = document.querySelector(".filter.active");

    if (activeFilter) {
      activeFilter.classList.remove("active");
    }

    button.classList.add("active");

    const filter = button.dataset.filter;
    render(filter === "all" ? menu : menu.filter((item) => item.cat === filter));
  });
});

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (cartBtn && cartPanel) {
  cartBtn.addEventListener("click", () => {
    cartPanel.classList.add("open");
  });
}

if (closeCart && cartPanel) {
  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });
}

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("show");
  });
}

document.addEventListener("mousemove", (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

render();
updateCart();
removeLoader();
