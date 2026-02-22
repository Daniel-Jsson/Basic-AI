let categories = []


async function loadCategories() {
    const response = await fetch("/models/categories.json");
    categories = await response.json();
    console.log(categories)
}

loadCategories();

function getRandomWord(){
    return categories[Math.floor(Math.random() * categories.length)];
}