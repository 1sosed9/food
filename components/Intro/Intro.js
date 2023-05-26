class Intro {
    constructor() {
        this.height =
            this.labelAdd = "Добавить в корзину";
        this.labelRemove = "Удалить из корзины";
    }

    render() {

        const html = `
                <h2 class="intro__title">Welcome to our store</h2>
                <p class="intro__sub-title">Go to the Shops section to select a brand</p>
        `;


        ROOT_INTRO.innerHTML = html;
    }
}

const introPage = new Intro;

