/*取樣函式
*/


//字體的取樣選項
class Font {
    static Width = 5;
    static Height = 7;
    static dx=5;    //點與點的距離，取樣的距離
    static dy=5;   //點與點的距離
    static BlackThresold = 30;  //亮度閥值，小於此值則視為黑色
    static BlackBool = true;  //若為黑色，則其 bool 將被設為 true 或 false ?
}//Font


//擷取字串的主函式
class Letter {
    constructor(pg, startX=0, startY=0, dx=Font.dx, dy=Font.dy, fontWidth=Font.Width, fontHeight=Font.Height) {
        this.pg=pg;
        this.FontWidth= fontWidth;
        this.FontHeight= fontHeight;
        this.compareFunction= this.compareBlack;

        this.bits = [];
        this.bits=this.asBools(startX, startY, dx, dy);
   }

   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 colors 陣列
   asColors(startX, startY, dx, dy) {
      let colors = this.getLetter(startX, startY, dx, dy, null);
      //console.log(colors);
      return colors;
   }


   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 bool 陣列，並存入 this.bits 方便未來的處理
   //compareFunction：可在 Letter 類別之外另行撰寫，並以函式指標參數傳入
   //也可以省略此參數，以預設的 compare 函數，做顏色的比對
   asBools(startX, startY, dx, dy) {
      return this.getLetter(startX, startY, dx, dy, this.compareFunction);
   }

    //比對顏色，若是亮度小於 BlackThresold，則傳回 BlackBool 所代表的布林值 
    compareBlack(c) {
        let value = brightness(c);
        return value <= Font.BlackThresold ? Font.BlackBool : !Font.BlackBool;
    }

   
   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 bool 陣列
   getLetter(startX, startY, dx, dy, compareFunction = null) {
       let bits = [];   //array of bools, or array of colors
      let y = startY;
      for (let j = 0; j < this.FontHeight; j++, y += dy) {
         let x = startX;

         for (let i = 0; i < this.FontWidth; i++, x += dx) {
            let result = this.extract(x, y, dx, dy, compareFunction);
            bits.push(result);

         }
      }

      //console.log(bits);
      return bits;
   }

    //預設：傳回偵測到的某一個顏色，此顏色其實是個陣列(裡面有四個元素，分別代表 r,g,b,a)
    //若未定義 compareFunction，則傳回顏色
    //否則依照 compareFunction 所定義，傳回指定的型別
    extract(x, y, dx, dy, compareFunction) {
        //print("x= "+x);
        //print("y= "+y);
        //let c = get(x, y);   //萃取顏色
        let c = this.pg.get(x, y);   //萃取顏色
        //print(c);

        //paintBox(x, y, dx, dy, c);

        //若 colorAs 有定義，則繼續執行 colorAs 函式，否則直接傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
        if (compareFunction) return compareFunction(c);
        else return c;
    }

    //------------------------------------------------------------------

    //把 bool 陣列轉換為字串陣列
    //當 true 時轉換為 trueChar 字元，
    //當 false 時轉換為 falseChar 字元
    toStringArray(trueChar, falseChar) {
        let strAry = [];
        if (this.bits.length === 0) {
            return "null";
        }

        let idx = 0;
        for (let j = 0; j < this.FontHeight; j++) {
            let str = "";
            for (let i = 0; i < this.FontWidth; i++) {
                str += this.bits[idx++] ? trueChar : falseChar;
            }
            strAry.push(str);
        }

        return strAry;
    }



}//class 






