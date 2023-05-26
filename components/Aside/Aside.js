class Aside {

    handlerOpenMacPage() {
        ROOT_CHOOSE.style.display = 'none'
        ROOT_MCDONALDS.style.display = 'block';
        mcdonals.render();
    }

    render() {
        let htmlShops = '';
        SHOPS.forEach(({ id, name }) => {
            htmlShops += `
                    <a href="#!" onclick="asidePage.handlerOpenMacPage();">
                        <span>${name}</span>
                    </a>
            `;
        });

        const html = `
            <div class="nav">
                <h2 class="nav__title">Shops</h2>
                <div class="shops-container">
                    ${htmlShops}
                </div>
            </div>
        `;

        ROOT_ASIDE.innerHTML = html;
    }
}

const asidePage = new Aside;
