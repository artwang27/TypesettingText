


let pg;
function setup() {
    pg = createGraphics(600, 50);
    pg.noFill();
    pg.rect(0, 0, 600, 50);

    pg.fill(0,255,0);
    pg.textSize(32);
    pg.text('王鐙儀', 0, 32);

    layout();

	let canvas=createCanvas(600, 300);
    canvas.position(300,0);
    

    reDraw();
}



function draw() {
    return;
}


//圖形重新繪製，並過濾成黑白兩色
function reDraw(){
    clear();

    /*
    textSize(32);
    text('word', 0, 32);
    rect(10, 10, 55, 55);
    */

    image(pg,0,0);
}





function LetterTest() {

    //重畫螢幕，因為上面可能有輔助格線，這次不要畫格線
    print("LetterTest");
    //reDraw();
    resetFont();


    let startx = float(dom.startx.value());    //22;
    let starty = float(dom.starty.value());    //15;

    let L = new Letter(startx, starty);

    //在 html 以文字 char 方式來填圖
    let strAry = L.toStringArray('O', '_');
    //print(strAry);
    showStringArrayHtml(strAry);

    drawLetterToCanvas();
}




//取樣字串裡的每個點
/*
letterPerLine：一行有幾個字
lines：共有幾行
spx：字距，字與字的距離 
spy：字距，字與字的距離
*/
function SamplingStrings(letterPerLine, lines, startx, starty,spx, spy){
    let letterAry=[];

    let y = starty;
    for(let j=0; j<lines; j++){
        let x=startx;
       
        for(let i=0; i<letterPerLine; i++){
            let L=new Letter(x,y,Font.dx, Font.dy);
            letterAry.push(L);
            
            x+=spx;
        }
        y+=spy;
    }

    return letterAry;
}



