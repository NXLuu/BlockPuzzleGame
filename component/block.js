
export class Block {
    constructor(parentHeight, parentWidth) {
        this.height = 52;
        this.width = 52;
        this.elem=this.createBlockElement();
        this.left = this.elem.offsetLeft;
        this.top = this.elem.offsetTop;
    }

    createBlockElement() {
        let elem = document.createElement("div");
        elem.style.width = this.width+"px";
        elem.style.height = this.height+"px";
        elem.className = "block";
        this.elem = elem;
        return elem;
    }

    createId(x, y) {
        this.elem.dataset.x = x;
        this.elem.dataset.y = y;
    }
}