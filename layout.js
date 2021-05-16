
let dom=Object;    //集中管理新增的控制項

function layout(){
    const textAreaWidth=300;
    //--------------------------------------------
    dom.textStr = makeInputLine("請輸入字串", "歡迎光臨！", textAreaWidth);
    dom.textStr.input(onCaptureWidthChanged);   //當輸入字串時，擷取的寬度也會跟著改變
    dom.textStr.mousePressed(onCaptureWidthChanged);

    dom.textSize = makeInputLine("字體大小", 32);
    dom.textSize.changed(onTextSizeChanged);
    //--------------------------------------------
    dom.drawPageImage = createCheckbox("在螢幕上顯示畫出來的字", true);

    //--------------------------------------------
    createP("字串的取樣選項(單位：px)");
    dom.f1 = makeInputLine("橫向取樣幾個點",160);
    dom.f2 = makeInputLine("縱向取樣幾個點", 32);
    dom.f3 = makeInputLine("左右點取樣間距", 1);
    dom.f4 = makeInputLine("上下點取樣間距", 1);

    //--------------------------------------------
    //--------------------------------------------
    dom.fontChar = makeInputLine("文字填充字元", "O");
    dom.bkgChar = makeInputLine("背景填充字元", " ");
    //--------------------------------------------
    dom.inverseText=createCheckbox("反轉",false);

    //--------------------------------------------

    //建立 go 按鈕
    dom.btn = createButton("Go");
    dom.btn.mousePressed(makeTypesettingText);

    //--------------------------------------------
    //製造一段用來排字的版面
    let pre=createElement("pre");
    dom.fontHTML=createDiv(""); //用排字的方法，把 font 變成 文字的組合
    dom.fontHTML.parent(pre);

    //--------------------------------------------
    let canvas = createCanvas(600, 300);
    canvas.position(textAreaWidth+100, 0);


}

//動態產生 Dom 的 Input 元素，(僅能輸入文字字串)
//description: 要出現的描述文字，提示玩家要輸入什麼
//defaultValue: 預設值為多少
//傳回 input 欄位的參考
function makeInputLine(descriptText, defaultValue, size=25){
    let d = createDiv(descriptText+" ");
    d.style('font-size', '12px');

    let ipt = createInput(defaultValue);
    ipt.style('font-size', '12px');
    ipt.size(size);   //px，輸入框的大小
    ipt.parent(d);
    
    ipt.changed(setupFont); //若有改變，則呼叫 setupFont()

    return ipt;
}


//-------------------------------------------------
//設定字形的基本屬性
function setupFont() {
    /*
    Font.Width=5;
    Font.Height=7;
    Font.dx=5;
    Font.dy=7;
    Font.BlackThresold =30;  //亮度閥值，小於此值則視為黑色
    Font.BlackBool = true;  //若為黑色，則其 bool 將被設為 true 或 false ?
    */

    Font.Width = int(dom.f1.value());
    Font.Height = int(dom.f2.value());
    Font.dx = float(dom.f3.value());
    Font.dy = float(dom.f4.value());
    Font.BlackBool = dom.inverseText.checked() ? true : false;
}


//當字體大小改變時，擷取的寬度及高度都要跟著改變
//讓字體與擷取的字高連動
function onTextSizeChanged(){
    let sz=int(dom.textSize.value());
    dom.f2.value(sz);

    onCaptureWidthChanged();
}


//當輸入的字串改變，或者字體大小改變時，擷取的寬度也要改變
function onCaptureWidthChanged(){
    let sz = int(dom.textSize.value());
    let str = dom.textStr.value();
    let w = sz * str.length;
    dom.f1.value(w);
    width=w;    //canvas 的寬度也要更改
}




