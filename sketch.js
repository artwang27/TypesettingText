

function setup() {
    layout();   //產生所有的控制項 dom 元件
}


//不使用 draw
function draw() {
    return;
}


//將文字所產生的圖形重新繪製到 canvas，
//有無此動作，並不會影響擷取的功能；只是讓使用者觀看到畫出來的[字]而已
function reDraw(pg){
    clear();        //清除 canvas 背景

    //若玩家想要在螢幕上顯示畫出來的字
    if( dom.drawPageImage.checked() ){
        image(pg, 0, 0);  //把要畫的內容複製過來
    }
}


//在指定的 graphic 上，畫出指定的字串
//使用白底黑字的效果非常糟糕，無法正確分離背景與字體的顏色，
//改以黑底白字很OK~
function drawString(str, size){
    let sWidth = size * str.length; //繪圖寬度=字體大小*字數
    let pg = createGraphics(sWidth, size);

    //畫輸入範圍的外框
    pg.stroke("black");
    pg.fill("black");
    pg.rect(0, 0, sWidth, size);

    //畫出指定的字串
    textAlign(CENTER, TOP);
    pg.stroke("black"); //字的外框
    pg.fill("white");   //字的內部
    pg.textSize(size);
    pg.text(str, 0, 3, sWidth);
    return pg;
}


//主控程式：
//用特定文字來排字
function makeTypesettingText() {
    setupFont();

    //重畫螢幕，因為上面可能有輔助格線，這次不要畫格線
    print("製造排版文字- TypesettingText");
    let str = dom.textStr.value();  //請輸入要拼貼的字串
    let size = int(dom.textSize.value());    //字體大小
    let pg = drawString(str, size);   //在指定的 graphic 上，畫出指定的字串

    let L = new Letter(pg);

    //在 html 以文字 char 方式來填圖

    let fontChar = dom.fontChar.value();  //文字填充字元 
    let bkgChar = dom.bkgChar.value();    //背景填充字元
    //let strAry = L.toStringArray('O', '_');
    let strAry = L.toStringArray(fontChar, bkgChar);

    //print(strAry);
    showStringArrayHtml(strAry);    //把拼字的結果以文字方式印到 html 網頁上

    //目前已經擷取完畢，接下來的動作，只是方便玩家觀察而已
    //以下動作，為非必要的選項
    reDraw(pg);     //把文字從 pg 畫到 canvas 上
    //drawSampleToCanvas(); //把取樣結果畫到 canvas 上
}





