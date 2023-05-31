class Header {

    handlerOpenHomePage() {
        ROOT_ASIDE.style.display = 'none';
        ROOT_INTRO.style.display = 'block';
        ROOT_MAIN.style.display = 'none';
        introPage.render();
        
    }

    handlerOpenAsidePage() {
        ROOT_ASIDE.style.display = 'block';
        ROOT_INTRO.style.display = 'none';
        ROOT_MAIN.style.display = 'block';
        asidePage.render();
        choosePage.render();      

    }

    handlerOpenShoppingPage() {
        shopingPage.render();
    }

    render(count) {
        const html = `
            <div class="header-container">

                <div class="header-shops">
                    <a href="#!" onclick="headerPage.handlerOpenHomePage();">Home</a>
                </div>

                <div class="header-shops">
                    <a href="#!" onclick="headerPage.handlerOpenAsidePage();">Shops</a>
                </div>
                

                <div class="header-cart" onclick="headerPage.handlerOpenShoppingPage();">
                    <a href="#!">Shopping</a>
                    🔥${count}
                </div>
            </div>
        `

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header;

