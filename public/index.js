function render() {
    const productsStore = localStorageUtil.getProducts();
    headerPage.render(productsStore.length);
    introPage.render();
}

// spinnerPage.render();
let CATALOG = [];

fetch('http://127.0.0.1:3000/api/restaurant/mcdonalds/menu')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        spinnerPage.handleClear();
        render();
    }).catch(error => {
        console.error(error)
        spinnerPage.handleClear();
        errorPage.render();
    });

