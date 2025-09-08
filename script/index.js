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
      loading();
      showCategoryTree(data.categories);
    })
    .catch((err) => {
      errorMessage();
      console(err);
    });
};

const showCategoryTree = (categoryTrees) => {
  categoryTrees.forEach((categoryTree) => {
    categoryTreeContainer.innerHTML += `
        <button id="${categoryTree.id}" class="category-btn hover:bg-[#15803d] hover:text-white p-1  rounded-lg">${categoryTree.category_name}</button>
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
    }
    if (e.target.className.includes("category-btn")) {
      loadPlantCategoryTrees(e.target.id);
      loading();
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
      errorMessage();
      console.log(err);
    });
};
const showPlantCategoryTrees = (plantsTrees) => {
  plantsCardContainer.innerHTML = "";
  plantsTrees.forEach((plantTree) => {
    // console.log(plantTree.id);
    plantsCardContainer.innerHTML += `
     <div class="space-y-2 shadow-xl rounded-sm bg-white p-2 h-fit ">
        <img class="mx-auto h-[150px] w-full rounded-md" src="${plantTree.image}"/>
        <div class="p-5 space-y-3">
        <h1 id="${plantTree.id}" class=" title-click text-xl font-bold cursor-pointer">${plantTree.name}</h1>
        <p class="h-[140px]">${plantTree.description}</p>

        <div class="flex justify-between items-center">
        <button class="border-1 border-emerald-400 rounded-xl p-2 text-green-500">${plantTree.category}</button>
        <p class="text-green-800 font-bold">$<span>${plantTree.price}</span></p>
        
        </div>
            <button class=" bg-green-600 text-white hover:bg-green-400 hover:text-gray-200 w-full p-2 rounded-2xl mt-3">Add to Cart</button>

        </div>
     
     </div>
    
    `;
  });
};

plantsCardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    const title = e.target.parentNode.children[0].innerText;
    const price = Number(
      e.target.parentNode.children[2].children[1].children[0].innerText
    );
    const id = e.target.parentNode.children[0].id;

    alert(`${title} has been added to the cart`);

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
      <div class="bg-[#f0fdf4] p-3 rounded-xl shadow-sm flex justify-between items-center mb-3">
              <div>
                <h1 class="font-bold">
                 ${item.name}
                </h1>
                <p class="text-gray-500 mt-1">$${item.price}</p>
              </div>
              <div onclick="handleDeleteCartItem('${item.id}')" class="text-2xl"><i class="fa-solid fa-circle-xmark"></i></div>

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
  loading();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showAllPlantsTrees(data.plants);
    })
    .catch((err) => {
      errorMessage();
      console.log(err);
    });
};

const showAllPlantsTrees = (allPlantsTrees) => {
  // console.log(allPlantsTrees);

  plantsCardContainer.innerHTML = "";
  allPlantsTrees.forEach((singlePlantTree) => {
    plantsCardContainer.innerHTML += `
     <div class="space-y-2 shadow-xl rounded-sm bg-white p-2 h-fit ">
        <img class="mx-auto h-[150px] w-full rounded-md" src="${singlePlantTree.image}"/>
        <div class="p-5 space-y-3">
        <h1 id="${singlePlantTree.id}" class=" title-click text-xl font-bold cursor-pointer">${singlePlantTree.name}</h1>
        <p class="h-[140px]">${singlePlantTree.description}</p>

        <div class="flex justify-between items-center">
        <button class="border-1 border-emerald-400 rounded-xl p-2 text-green-500">${singlePlantTree.category}</button>
        <p class="text-green-800 font-bold">$<span>${singlePlantTree.price}</span></p>
        
        </div>
            <button class="bg-green-600 text-white hover:bg-green-400 hover:text-gray-200 w-full p-2 rounded-2xl mt-3">Add to Cart</button>

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
      <div class="space-y-3">
         <h1 class="font-bold text-xl mb-2">${details.name}</h1>
         <img class="" src="${details.image}"/>
         <p><span class="font-bold mt-2">Category:</span><span>${details.category}</span></p>
      <p><span class="font-bold">Price:</span><span>$${details.price}</span></p>
      <p><span class="font-bold">Description:</span><span>${details.description}</span></p>
      
      </div>
  
  `;
};
const loading = () => {
  plantsCardContainer.innerHTML = `
  <div class="flex justify-center items-center text-center my-3 col-span-7"><span class="loading loading-spinner text-success"></span></div>
  `;
};
const errorMessage = () => {
  plantsCardContainer.innerHTML = `
   <div class="text-center col-span-5 space-y-3">
       <img class="mx-auto" src="./assets/alert-error.png"/>
       <h1 class="text-3xl text-gray-700">No Internet</h1>
   </div>
  `;
};
categoryTreeLoad();
allPlantsTreeLoad();
