const mainDiv = document.getElementById("main-div");
const div = document.getElementById("total");

let items = [];
const storedData = localStorage.getItem("pArray");
if (storedData) {
  try {
    const parsed = JSON.parse(storedData);
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    items = [];
  }
}

function print() {
  mainDiv.innerHTML = "";
  if (items.length === 0) {
    mainDiv.innerHTML =
      '<h3 style="text-align:center; color:#d10047;">Your cart is empty.</h3>';
    div.innerHTML = "";
    return;
  }

  for (let i = 0; i < items.length; i++) {
    mainDiv.innerHTML += `
      <div class="main">
        <h2 style="padding:10px">${items[i].brand}</h2>
        <img src="${items[i].img}" class="image" style="width:150px; height:auto;" />
        <h3>Product: ${items[i].model}</h3>
        <h3>Size: ${items[i].size}</h3>
        <h3>Type: ${items[i].type}</h3>
        <h3>Quantity: ${items[i].Quantity}</h3>
        <h3
          style="
            border: 1px solid;
            border-radius: 15px 50px;
            background-color: #e5f3ff;
            margin-top: 6px;
            margin-bottom: 6px;
            padding: 6px;
          "
        >
          Total Price:
          <span style="color:red; font-weight:bolder; font-size:20px;">
            Rs.${items[i].total}
          </span>
        </h3>
        <div style="display:flex; justify-content:center; gap:9px;" class="add-sub">
          <button onclick="remove(${i})">Delete</button>
          <button onclick="plus(${i})" style="margin:4px; padding:7px 20px; border-radius: 3px;">+</button>
          <button onclick="minus(${i})" style="margin:4px; padding:7px 20px; border-radius: 3px;">-</button>
        </div>
      </div>
    `;
  }
  check();
}

function check() {
  let totalCarrier = 0;
  for (let i = 0; i < items.length; i++) {
    totalCarrier += items[i].total;
  }
  div.innerHTML = `Total: Rs.${totalCarrier}`;
}

function plus(index) {
  items[index].Quantity += 1;
  items[index].total = items[index].price * items[index].Quantity;
  localStorage.setItem("pArray", JSON.stringify(items));
  print();
}

function minus(index) {
  items[index].Quantity -= 1;
  if (items[index].Quantity === 0) {
    items.splice(index, 1);
  } else {
    items[index].total = items[index].price * items[index].Quantity;
  }
  localStorage.setItem("pArray", JSON.stringify(items));
  print();
}

function remove(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      items.splice(index, 1);
      localStorage.setItem("pArray", JSON.stringify(items));
      print();
      Swal.fire("Deleted!", "The item has been removed.", "success");
    }
  });
}

function gotoCart() {
  localStorage.setItem("pArray", JSON.stringify(items));
  window.location.href = "./cart.html";
}

print();
