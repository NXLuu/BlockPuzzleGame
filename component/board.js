import {Puzzel} from './puzzel.js'


export class Board {
    constructor() {
        this.height = 639;
        this.width = 535;
        this.row = 12;
        this.time = 600;
        this.isFalling = null;
        this.collumn = 10;
        this.arr = null;
        this.puzzel=null;
        
        this.createBoard();
        this.runPuzzel();
    }
    createArrPos() {
        for (let i=0; i<this.row; ++i)
            for (let j=0; j<this.collumn; ++i)
                this.arr[i][j] = 0;
    }

    checkPos(left, top) {
        this.arr[left/53][top/53] = 1;
        console.log(this.arr);
    }

    createBoard() {
        this.elem = document.createElement("table");
        this.elem.id = "game-board";

        this.elem.style.width = this.width + "px";
        this.elem.style.height = this.height + "px";

       for (let i=0; i<this.row; ++i) {
           let row = document.createElement("tr");
           row.classList.add(i);
            for (let j=0; j<this.collumn; ++j) {
                let cell = document.createElement("td");
                cell.style.width = 53 + "px";
                cell.style.height = 53 + "px";
                cell.classList.add(j);
                row.append(cell);
            }
            this.elem.append(row);
       }
       return this.elem;
    }

    runPuzzel() {
        
        if (!this.puzzel) this.time = 100;
    
        let id = setInterval(()=>{
            if (this.puzzel && this.puzzel.falling) return; 
            if (this.isFalling) return;
            let puzzel = new Puzzel();
            this.puzzel = puzzel;
            puzzel.createPuzzel();
            if (this.endGame()) {
                clearInterval(id);
                puzzel.remove();
            }
    
        }, this.time);
       
    }

    startPuzzel(blocks) {
        for (let block of blocks) {
            this.elem.rows[block.dataset.x].cells[block.dataset.y].append(block);
        }
    }

    endGame() {
        for (let i=0; i<12; ++i) {
        let cnt = 0;
        let row = this.elem.rows[i];
        for  (let cell of row.cells) {
            if (cell.children.length > 1)
                return true;
            else if (cell.children.length == 1) ++cnt;
        }
        if (cnt == 10) {
            // score.innerHTML = +score.textContent + 100;
            for (let cell of row.cells) {
                cell.children[0].remove();
            }

            for (let  j=0; j<i; ++j) {
                for (let cell of this.elem.rows[j].cells) {
                    let elem1 = cell.children[0];
                    let check = true;
                    for (let block of this.puzzel.blocks) {
                        console.log(block);
                        if (elem1 == block) {
                            check = false;
                            break;
                        }
                    }
                    if (elem1 && check) {
                        let x = +elem1.dataset.x;
                        x += 1;
                        elem1.dataset.x = x;
                        this.elem.rows[x].cells[elem1.dataset.y].append(elem1);
                    }
                }
            }
        }
        }
        return false;
    }

}