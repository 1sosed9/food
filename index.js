function render() {
    const productsStore = localStorageUtil.getProducts();
    headerPage.render(productsStore.length);
    introPage.render();
}

spinnerPage.render();

let CATALOG = [];

fetch('./server/mcdonalds.json')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        spinnerPage.handleClear();
        render();
    })
    .catch(error => {
        spinnerPage.handleClear();
        errorPage.render();
    });

