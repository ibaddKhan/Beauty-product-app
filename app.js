const mainDiv = document.getElementById("main-div");

const beautyProducts = [
  {
    img: "https://images.unsplash.com/photo-1670832214770-a767f06d203b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "L'Oréal",
    model: "Revitalift Serum",
    size: "50ml",
    type: "Anti-aging",
    price: 1500,
  },
  {
    img: "https://images.unsplash.com/photo-1731577178007-d48d92fd30fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "The Body Shop",
    model: "Tea Tree Oil",
    size: "30ml",
    type: "Acne Treatment",
    price: 800,
  },
  {
    img: "https://images.unsplash.com/photo-1670832215724-cce6d9ee619c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Clinique",
    model: "Moisture Surge",
    size: "48ml",
    type: "Hydrating Gel",
    price: 2200,
  },
  {
    img: "https://images.unsplash.com/photo-1670538528407-e4bc84b0585f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Neutrogena",
    model: "Hydro Boost",
    size: "50ml",
    type: "Face Cream",
    price: 1200,
  },
  {
    img: "https://images.unsplash.com/photo-1705155726502-4d7eb6c300cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Estée Lauder",
    model: "Advanced Night Repair",
    size: "30ml",
    type: "Serum",
    price: 3500,
  },
  {
    img: "https://images.unsplash.com/photo-1615041359204-45a4dff5ec92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Dove",
    model: "Deep Moisture Body Wash",
    size: "400ml",
    type: "Body Wash",
    price: 650,
  },
  {
    img: "https://images.unsplash.com/photo-1733954427676-df344b0a0951?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Nivea",
    model: "Soft Cream",
    size: "200ml",
    type: "Moisturizer",
    price: 700,
  },
  {
    img: "https://images.unsplash.com/photo-1702475139171-ea244073066b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "MAC",
    model: "Matte Lipstick",
    size: "3g",
    type: "Makeup",
    price: 1500,
  },
  {
    img: "https://images.unsplash.com/photo-1656422901558-9cb1e263b6ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Sephora",
    model: "Makeup Remover",
    size: "150ml",
    type: "Cleanser",
    price: 1100,
  },
];

// Load saved cart array or empty
let pArray = [];
const storedData = localStorage.getItem("pArray");
if (storedData) {
  try {
    const parsed = JSON.parse(storedData);
    if (Array.isArray(parsed)) pArray = parsed;
  } catch {
    pArray = [];
  }
}

// Render products
function renderProducts() {
  mainDiv.innerHTML = "";
  beautyProducts.forEach((prod, i) => {
    mainDiv.innerHTML += `
      <div class="main">
        <h2>${prod.brand}</h2>
        <img src="${prod.img}" alt="${prod.model}" />
        <h3>Product: ${prod.model}</h3>
        <h3>Size: ${prod.size}</h3>
        <h3>Type: ${prod.type}</h3>
        <h3 class="price-tag">
  Price: <span class="price-value">Rs.${prod.price}</span>
</h3>
        <button class="cart" onclick="cart(${i})">Buy Now</button>
      </div>
    `;
  });
}

function cart(index) {
  // Check if product already in cart by unique combination brand+model (since no id)
  let found = false;
  for (let i = 0; i < pArray.length; i++) {
    if (
      pArray[i].brand === beautyProducts[index].brand &&
      pArray[i].model === beautyProducts[index].model
    ) {
      pArray[i].Quantity += 1;
      pArray[i].total = pArray[i].Quantity * pArray[i].price;
      found = true;
      break;
    }
  }

  if (!found) {
    const productCopy = { ...beautyProducts[index] };
    productCopy.Quantity = 1;
    productCopy.total = productCopy.price;
    pArray.push(productCopy);
  }

  localStorage.setItem("pArray", JSON.stringify(pArray));

  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `${beautyProducts[index].brand} ${beautyProducts[index].model} added.`,
    timer: 1200,
    showConfirmButton: false,
    position: "top-center",
    toast: true,
  });
}

function gotoCart() {
  localStorage.setItem("pArray", JSON.stringify(pArray));
  window.location.href = "./cart.html";
}

renderProducts();
