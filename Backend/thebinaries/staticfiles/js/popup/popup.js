const Popup = function(){
    this.dom = document.createElement("div");
    this.body = document.createElement("div");
    this.appendDom = document.body;

    this.updateClose = () => {};

    this.close = () => {
        this.dom.classList.remove('active');

        setTimeout(()=>{
            this.dom.remove();
        },300)

        this.updateClose();
    }

    this.updateBody = () => {}

    this.getDom = () => {
        this.dom.classList.add('popup');
        this.dom.innerHTML = `
            <div class="close-button">
                <i class="fa fa-times"></i>
            </div>
            <div class="modal"></div>
            <div id="overlay" class="overlay"></div>
        `;

        this.body.classList.add("modal-body");
        this.updateBody();
        this.dom.querySelector('.modal').append(this.body);

        this.dom.querySelector(".close-button").addEventListener("click", (e) => {
            this.close();
        })

        this.dom.querySelector(".overlay").addEventListener("click", (e) => {
            this.close();
        })

        return this.dom;
    }

    this.display = () => {
        this.getDom();
        this.appendDom.append(this.dom);
        setTimeout(() => {
            this.dom.classList.add('active');
        }, 100);
    }
}

export default Popup;