"use strict"

import { Block } from './block.js'


export class Puzzel extends Block{
    constructor(height, width) {
        super(height, width);
        this.type = Math.floor(Math.random()*5 + 1);
        this.type2 = 0;
        this.falling = true;
        this.fallId = null;
        this.time = 1000;
        this.fall = this.fall.bind(this);
        setTimeout(()=>{
            this.fall();
        },10);
         this.indexRow = {
            1: [[0, 1, 2, 3], [0, 0, 0, 0]],
            2: [[0, 1, 2, 2], [0, 0, 1 , 2], [0, 0, 1, 2], [0, 1, 2, 2]],
            3: [[0, 0, 1, 1], [0, 1, 1, 2]],
            4: [[1, 1, 0, 0], [2, 1 , 1, 0]],
            5: [[1, 1, 1, 0]]
            
        };

        this.indexCollumn = {
            1:[[0, 0, 0, 0], [0, 1, 2, 3]],
            2:[[0, 0, 0, 1], [0, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 0]],
            3: [[0, 1, 1, 2], [0, 0, 1, 1]],
            4: [[0, 1, 1, 2], [0, 0, 1, 1]],
            5: [[0, 1, 2, 1]]
        }
        this.move = this.move.bind(this);
        this.checkMove = this.checkMove.bind(this);
        this.elem = document.createElement("div");
        this.blocks = [];
        document.addEventListener("keydown", this.move);
        this.table = document.getElementById("game-board");
    }
    createPuzzel() {
        for (let i=0; i<4; ++i) {
            let elem = this.createBlockElement();
            this.createId(this.indexRow[this.type][0][i], this.indexCollumn[this.type][0][i]);
            this.table.rows[elem.dataset.x].cells[elem.dataset.y].append(elem);
            this.blocks.push(elem);
        }
        return this.blocks;
    }

    nowFall() {
        if (!this.falling) return;
               
                if (this.checkStop()) {
                    console.log(1)
                    this.falling = false;
                    clearInterval(this.fallId);
                    document.removeEventListener("keydown", this.move);
                    return;
                }

                for (let block of this.blocks) {
                    let newX = +block.dataset.x + 1;
                    
                    block.dataset.x = newX;
                    this.table.rows[newX].cells[block.dataset.y].append(block);
                    
                }
    }

    fall() {
            this.fallId = setInterval(()=>{
               this.nowFall(); 
            },this.time);

    }

    checkStop() {
        let blocks = this.blocks.map((item)=>{
            let obj={};

            obj.x = +item.dataset.x + 1;
            obj.y = +item.dataset.y;
            return obj;
        });
        return this.checkMove(blocks);
    }

    checkMove(blocks) {
        for (let block of blocks) {
            let x = block.x;
            let y = block.y;

            if (x < 0 || y<0 || x > 11 || y > 9) return true;
            let td = this.table.rows[x].cells[y].children[0];
            if(td) {
                let check = false;
                for (let block of this.blocks) {
                    if(td == block) check = true;
                }

                if (!check) return true;
            }

        }
        return false;
    }

    move(event) {
        let blocks = this.blocks.map((item,i)=>{
                let obj={};

                obj.x = +item.dataset.x;
                obj.y = +item.dataset.y;

                if (event.code == "ArrowRight")
                obj.y += 1;
                if (event.code == "ArrowLeft")
                obj.y -= 1;
                if (event.code == "ArrowUp") {
                    let length = this.indexRow[this.type].length;
                    let oldType = this.type2;
                    let newType = (this.type2 + 1) % length;
                    let row = this.indexRow[this.type];
                    let col = this.indexCollumn[this.type];
                    obj.x = obj.x - row[oldType][i] + row[newType][i];
                    obj.y = obj.y - col[oldType][i] + col[newType][i];
                }


                return obj;
            });
        if(this.checkMove(blocks)) return;

        for (let block of this.blocks) {
            let newX = +block.dataset.x;
            let newY;
            console.log(event.code);
            if (event.code == "ArrowRight")
            newY = +block.dataset.y+1;
            if (event.code == "ArrowLeft")
            newY = +block.dataset.y-1;
            if (event.code == "ArrowDown") {
                clearInterval(this.fallId);
                setInterval(() => {
                    this.nowFall();
                }, 1);
                return;
            }

            if (event.code == "ArrowUp") {
                this.transform();
                return;
            }
            block.dataset.y = newY;
            block.dataset.x = newX;
            this.table.rows[newX].cells[block.dataset.y].append(block);
        } 
    }

    transform() {
        let length = this.indexRow[this.type].length;

        let oldType = this.type2;
        let newType = (this.type2 + 1) % length;
        this.type2 = newType;
        let  i =0;
        for (let block of this.blocks) {
            let x = +block.dataset.x;
            let y = +block.dataset.y;
            let row = this.indexRow[this.type];
            let col = this.indexCollumn[this.type];

            x = x - row[oldType][i] + row[newType][i];
            y = y - col[oldType][i] + col[newType][i];
            ++i;

            block.dataset.y = y;
            block.dataset.x = x;
            this.table.rows[x].cells[y].append(block);
        }
    }
    remove() {
        for (let block of this.blocks) {
            block.remove();
        }
    }
}