const addLoading = () => {
    document.getElementById("addRemove-loading").classList.remove("hidden");
};
const removeLoading = () => {
    document.getElementById("addRemove-loading").classList.add("hidden");
};

const middleSectionCards = document.getElementById("middle-section-Cards");

// all plant API
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
let plants = [];
addLoading();
fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.plants);
        middleSectionCards.innerHTML = "";
        plants = data.plants;
        plants.forEach((plant) => {
            middleSectionCards.innerHTML += `
            <div id="${plant.id}" class="card bg-base-100 shadow-sm">
                                <figure class="">
                                    <img
                                        src="${plant.image}"
                                        alt="Plant"
                                        class="rounded-t-xl h-48 w-full object-cover"
                                    />
                                </figure>
                                <div class="card-body px-3 pt-0">
                                    <h2 class="card-title">${plant.name}</h2>
                                    <p class="text-sm font-light">
                                        ${plant.description}
                                    </p>
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <button
                                            class="btn btn-xs rounded-xl bg-[#dcfce7] text-[#15803D]"
                                        >
                                            ${plant.category}
                                        </button>
                                        <p class="text-right"><span class="text-xl font-bold">৳</span>${plant.price}</p>
                                    </div>
                                    <div class="card-actions">
                                        <button
                                            class="btn btn-primary w-full bg-[#11a045] hover:bg-[#15803D] rounded-full"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
            `;
        });
        document
            .getElementById("all-trees")
            .classList.add("bg-[#166534]", "text-white");
        removeLoading();
    });
// all categories---------
// "id": 1,
// "category_name": "Fruit Tree",
// "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."

fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        const allDivCategories = document.getElementById("allDiv-categories");
        //console.log(data.categories);
        const categories = data.categories;
        categories.forEach((category) => {
            //console.log(category);
            allDivCategories.innerHTML += `
                            <button id="${category.id}"
                                class="w-full text-left text-xs sm:text-sm p-2 rounded-sm hover:bg-[#166534] hover:text-white"
                            >
                                ${category.category_name}
                            </button>
            `;
        });
    });

document.getElementById("left-section").addEventListener("click", function (e) {
    addLoading();
    if (e.target.tagName === "BUTTON") {
        document
            .querySelectorAll("#allDiv-categories button")
            .forEach((btn) => {
                btn.classList.remove("bg-[#166534]", "text-white");
            });
        document
            .getElementById(e.target.id)
            .classList.add("bg-[#166534]", "text-white");
        fetch(
            `https://openapi.programming-hero.com/api/${e.target.id === "all-trees"
                ? "plants"
                : "category/" + e.target.id
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.plants);
                const targetedPlants = data.plants;
                middleSectionCards.innerHTML = "";
                targetedPlants.forEach((plant) => {
                    //console.log(plant);
                    middleSectionCards.innerHTML += `
                    <div id="${plant.id}" class="card bg-base-100 shadow-xl cursor-pointer">
                                <figure class="">
                                    <img
                                        src="${plant.image}"
                                        alt="Plant"
                                        class="rounded-t-xl h-48 w-full object-cover"
                                    />
                                </figure>
                                <div class="card-body px-3 pt-0">
                                    <h2 class="card-title">${plant.name}</h2>
                                    <p class="text-sm font-light">
                                        ${plant.description}
                                    </p>
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <button
                                            class="btn btn-xs rounded-xl bg-[#dcfce7] text-[#15803D]"
                                        >
                                            ${plant.category}
                                        </button>
                                        <p class="text-right"><span class="text-xl font-bold">৳</span>${plant.price}</p>
                                    </div>
                                    <div class="card-actions">
                                        <button
                                            class="btn btn-primary w-full bg-[#11a045] hover:bg-[#15803D] rounded-full"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                    `;
                });
                removeLoading();
                //modalDetails(targetedPlants);
            });
    }
});
//modal functionalities ---------------------------
const modalDetails = (plantId) => {
    const selectedPlant = plants.find((plant) => plant.id == plantId);
    if (!selectedPlant) {
        return;
    }
    const modal = document.getElementById("my_modal_5");
    modal.innerHTML = `
    <div class="modal-box shadow-2xl max-h-[90vh] overflow-y-auto">
                            <h3 class="text-lg font-bold">${selectedPlant.name}</h3>
                            <img class="w-full h-[250px] object-cover rounded-md" src="${selectedPlant.image}" alt="">
                            <p class="py-2 font-bold">
                                ${selectedPlant.category}
                            </p>
                            <h1><span class="font-bold">Price: ৳</span>${selectedPlant.price}</h1>
                            <p class="text-sm py-2">${selectedPlant.description}</p>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn btn-soft btn-error">Exit</button>
                                </form>
                            </div>
                        </div>
    `;
    modal.showModal();
};
document
    .getElementById("middle-section-Cards")
    .addEventListener("click", function (e) {
        //console.log(e.target);
        if (e.target.innerText === "Add To Cart") {
            const cartPrice =
                e.target.parentNode.parentNode.children[2].children[1]
                    .innerText;
            const cartTitle =
                e.target.parentNode.parentNode.children[0].innerText;
            alert(`${cartTitle} has been addded to your CART 🛒`);

            let found = false;
            const cartItem = document.querySelectorAll(".cart-item");
            cartItem.forEach((item) => {
                // console.log(item);
                const title = item.querySelector("h1").innerText;
                //console.log(title);
                if (title === cartTitle) {
                    const quantitySpan =
                        item.querySelector("p span:last-child");
                    quantitySpan.innerText =
                        parseInt(quantitySpan.innerText) + 1;
                    found = true;
                }
            });
            if (!found) {
                document.getElementById("add-to-cart-div").innerHTML += `
            <div
                                class="cart-item bg-[#f0fdf4] flex justify-between items-center p-2 m-2 rounded-lg"
                            >
                                <div>
                                    <h1 class="font-semibold text-sm">
                                        ${cartTitle}
                                    </h1>
                                    <p class="text-xs">
                                        <span>${cartPrice}</span> x <span>1</span>
                                    </p>
                                </div>
                                <div>
                                    <button
                                        class="delete-cart-button hover:text-red-600 cursor-pointer text-xl font-bold"
                                    >
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
            `;
            }
        }
        totalAmount();
        const card = e.target.closest(".card");
        if (
            card &&
            (e.target.tagName === "H2" ||
                e.target.tagName === "P" ||
                e.target.tagName === "IMG")
        ) {
            modalDetails(card.id);
        }
    });

document
    .getElementById("add-to-cart-div")
    .addEventListener("click", function (e) {
        //console.log(e.target);
        if (e.target.closest(".delete-cart-button")) {
            e.target.closest(".cart-item").remove();
        }
        totalAmount();
    });

const totalAmount = () => {
    const cartItem = document.querySelectorAll(".cart-item");
    let total = 0;
    cartItem.forEach((item) => {
        //console.log(item);
        const quantitySpan = parseInt(
            item.querySelector("p span:last-child").innerText
        );
        const cartPrice = parseInt(
            item.querySelector("p span:first-child").innerText.replace("৳", "")
        );
        const multiply = quantitySpan * cartPrice;
        total += multiply;
    });
    document.getElementById("total-cart-amount").innerText = total;
};