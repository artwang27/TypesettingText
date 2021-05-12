
let dom=Object;    //集中管理新增的控制項

function layout(){
    //--------------------------------------------

    //--------------------------------------------
    createP("設定單字選項");
    dom.f1 = makeInputLine("橫向取樣幾個點",320);
    dom.f2 = makeInputLine("縱向取樣幾個點", 32);
    dom.f3 = makeInputLine("左右點距(px)", 1);
    dom.f4 = makeInputLine("上下點距(px)", 1);

    //--------------------------------------------
    createDiv("偵測像素的起始位置");
    dom.startx = makeInputLine("startx", 0);
    dom.starty = makeInputLine("starty", 4);

    //--------------------------------------------
    //--------------------------------------------
    createP("黑色判別標準");
    dom.brightnessThresold= makeInputLine("亮度小於多少視為黑色(0~100)", 30);

    let d=createDiv("把黑色視為:");
    d.style('font-size', '12px');
    dom.blackAsBool = createSelect();
    dom.blackAsBool.option("true");
    dom.blackAsBool.option("false");
    dom.blackAsBool.selected("false");
    dom.blackAsBool.parent=d;
    dom.blackAsBool.changed(resetFont); //若有改變，則更新

    //--------------------------------------------
    //建立 go 按鈕
    dom.btn = createButton("Go");
    dom.btn.mousePressed(LetterTest);

    //--------------------------------------------
    //製造一段用來排字的版面
    let pre=createElement("pre");
    dom.fontHTML=createDiv(""); //用排字的方法，把 font 變成 文字的組合
    dom.fontHTML.parent(pre);

    //--------------------------------------------
 

}

//動態產生 Dom 的 Input 元素
//description: 描述文字，詢問玩家要輸入什麼
//defaultValue: 預設值為多少
//傳回 input 欄位
function makeInputLine(descriptText, defaultValue){
    let d = createDiv(descriptText+" ");
    d.style('font-size', '12px');

    let ipt = createInput(defaultValue);
    ipt.style('font-size', '12px');
    ipt.size(50);   //px，輸入框的大小
    ipt.parent(d);
    
    ipt.changed(resetFont); //若有改變，則更新 

    return ipt;
}

//-------------------------------------------------
//設定字形的基本屬性
function resetFont() {
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
    Font.BlackThresold = int(dom.brightnessThresold.value());
    Font.BlackBool = dom.blackAsBool.value()==="true" ? true: false;



    //drawFontGrid();
}






