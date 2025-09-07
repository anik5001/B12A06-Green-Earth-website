const categoryTreeContainer = document.getElementById("categoryTreeContainer");

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
      console.log(data);
    })
    .catch((err) => {
      console(err);
    });
};
const showCategoryTree = (categoryTrees) => {
  categoryTrees.forEach((categoryTree) => {
    categoryTreeContainer.innerHTML += `
        <button class=" hover:bg-[#15803d] hover:text-white p-1 text-left rounded-lg">${categoryTree.category_name}</button>
    `;
    // console.log(categoryTree.category_name);
  });

  categoryTreeContainer.addEventListener("click", (e) => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      button.classList.remove("bg-[#15803d]");
      button.classList.remove("text-white");
    });
    console.log(buttons);

    if (e.target.localName === "button") {
      e.target.classList.add("bg-[#15803d]");
      e.target.classList.add("text-white");
    }
  });
};
const showAllCategoryTrees = () => {
  console.log("click all");
};
categoryTreeLoad();
categoryAllTreesLoad();
