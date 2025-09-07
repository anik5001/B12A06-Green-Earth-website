const categoryTreeContainer = document.getElementById("categoryTreeContainer");
const plantsCardContainer = document.getElementById("plantsCardContainer");
const cartCardContainer = document.getElementById("cartCardContainer");

const modalContainer = document.getElementById("modalContainer");
const totalPriceContainer = document.getElementById("totalPrice");

let cartItems = [];

const categoryTreeLoad = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      showCategoryTree(data.categories);
    })
    .catch((err) => {
      console(err);
    });
};
const categoryAllTreesLoad = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
    })
    .catch((err) => {
      console(err);
    });
};
const showCategoryTree = (categoryTrees) => {
  categoryTrees.forEach((categoryTree) => {
    categoryTreeContainer.innerHTML += `
        <button id="${categoryTree.id}" class=" hover:bg-[#15803d] hover:text-white p-1  rounded-lg">${categoryTree.category_name}</button>
    `;
    // console.log(categoryTree.category_name);
  });

  categoryTreeContainer.addEventListener("click", (e) => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      button.classList.remove("bg-[#15803d]");
      button.classList.remove("text-white");
    });
    // console.log(buttons);

    if (e.target.localName === "button") {
      e.target.classList.add("bg-[#15803d]");
      e.target.classList.add("text-white");

      loadPlantCategoryTrees(e.target.id);
    }
  });
};
const loadPlantCategoryTrees = (id) => {
  // console.log(id);

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantCategoryTrees(data.plants);
    })
    .catch((err) => {
      allPlantsTreeLoad();
      console.log(err);
    });
};
const showPlantCategoryTrees = (plantsTrees) => {
  plantsCardContainer.innerHTML = "";
  plantsTrees.forEach((plantTree) => {
    // console.log(plantTree.id);
    plantsCardContainer.innerHTML += `
     <div class="space-y-2 shadow-xl rounded-sm bg-white p-2 ">
        <img class="mx-auto h-[150px] w-full rounded-t-md" src="${plantTree.image}"/>
        <div  class="p-3 space-y-2">
        <h1 id="${plantTree.id}" class="title-click text-xl font-bold">${plantTree.name}</h1>
        <p>${plantTree.description}</p>

        <div class="flex justify-between">
        <button class="border-1 border-emerald-400 rounded-xl p-2 text-green-500">${plantTree.category}</button>
        <p class="text-green-800 font-bold">$<span>${plantTree.price}</span></p>
        
        </div>
            <button class="bg-green-600 w-full p-2 rounded-2xl">Add to Cart</button>

        </div>
     
     </div>
    
    
    
    `;
  });
};

plantsCardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    // console.log("cart click");
    const title = e.target.parentNode.children[0].innerText;
    const price = Number(
      e.target.parentNode.children[2].children[1].children[0].innerText
    );
    const id = e.target.parentNode.children[0].id;
    cartItems.push({
      id: `${id}`,
      name: `${title}`,
      price: price,
      count: 0,
    });
    showCartItemsAndTotalPrice(cartItems);
    // console.log(price);
    // console.log(title);
    // console.log(id);
  }
  if (e.target.className.includes("title-click")) {
    modalLoadPlantsTree(e);
    modal_details.showModal();
  }
  // console.log(e);
});

const showCartItemsAndTotalPrice = (cartItems) => {
  cartCardContainer.innerHTML = "";
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price;
    // console.log(totalPrice);
    cartCardContainer.innerHTML += `
      <div class="bg-[#f0fdf4] p-3 rounded-lg flex justify-between items-center mt-3">
              <div>
                <h1 class="font-bold">
                 ${item.name}
                </h1>
                <p>$${item.price}*<span id="countItem">1</span></p>
              </div>
              <div onclick="handleDeleteCartItem('${item.id}')">❌</div>

            </div>
    `;
  }
  totalPriceContainer.innerText = totalPrice;
};
const handleDeleteCartItem = (itemId) => {
  const filterCartItem = cartItems.filter(
    (cartItems) => cartItems.id !== itemId
  );
  cartItems = filterCartItem;
  showCartItemsAndTotalPrice(cartItems);
};

const allPlantsTreeLoad = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showAllPlantsTrees(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showAllPlantsTrees = (allPlantsTrees) => {
  // console.log(allPlantsTrees);
  allPlantsTrees.forEach((singlePlantTree) => {
    plantsCardContainer.innerHTML += `
     <div class="space-y-2 shadow-xl rounded-sm bg-white p-2 h-fit ">
        <img class="mx-auto h-[150px] w-full rounded-t-md" src="${singlePlantTree.image}"/>
        <div class="p-5 space-y-3">
        <h1 id="${singlePlantTree.id}" class=" title-click text-xl font-bold">${singlePlantTree.name}</h1>
        <p>${singlePlantTree.description}</p>

        <div class="flex justify-between">
        <button class="border-1 border-emerald-400 rounded-xl p-2 text-green-500">${singlePlantTree.category}</button>
        <p class="text-green-800 font-bold">$<span>${singlePlantTree.price}</span></p>
        
        </div>
            <button class="bg-green-600 w-full p-2 rounded-2xl">Add to Cart</button>

        </div>
     
     </div>
    
    `;
  });
};
const modalLoadPlantsTree = (e) => {
  const id = e.target.id;
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.plants);
      showModalPlantTreeDetails(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(id);
};

const showModalPlantTreeDetails = (details) => {
  // console.log(details);

  modalContainer.innerHTML = `
      <div class="space-y-2">
         <h1 class="font-bold">${details.name}</h1>
         <img src="${details.image}"/>
         <p><span class="font-bold">Category:</span><span>${details.category}</span></p>
      <p><span class="font-bold">Price:</span><span>$${details.price}</span></p>
      <p><span class="font-bold">Description:</span><span>${details.description}</span></p>
      
      </div>
  
  `;
};

categoryTreeLoad();
allPlantsTreeLoad();
