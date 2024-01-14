/* //////////////////////////////////////////////////////////////////// */
/* ダンジョンコントロールクラス */
class dungeonController {
  constructor() {
    this.actorList = [];
    this.mapObj = {};
  }

  //ダンジョンの縦横のマス数を決める
  setDungeonSize(width, height) {
    this.width = width;
    this.height = height;
  }

  //ひとマスのサイズpx決め
  setSquareSize(pixel) {
    this.squareSize = pixel;
  }

  setCanvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
  }

  //線を引いてダンジョンを作成する
  drawDungeon() {
    //縦
    for (let row = 0; row <= this.height; row++) {
      let startX = 0;
      let startY = row * this.squareSize;
      let endX = this.width * this.squareSize;
      let endY = row * this.squareSize;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY); //線を引く
      //横
      for (let col = 0; col <= this.width; col++) {
        let startX = col * this.squareSize;
        let startY = 0;
        let endX = col * this.squareSize;
        let endY = this.height * this.squareSize;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY); //線を引く
      }
    }

    this.ctx.stroke();
  }

  addActorToList(actor) {
    this.actorList.push(actor);
  }

  drawActor(actorObj) {
    //actorの描画位置の左上座標を指定
    this.ctx.beginPath();
    let x = (actorObj.location.col - 1) * this.squareSize;
    let y = (actorObj.location.row - 1) * this.squareSize;
    /* this.ctx.fillStyle = "blue";
    this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
    this.ctx.fill(); //図形を描画 */

    // 画像の読み込み
    var image = new Image();
    image.src = actorObj.imageFileName; // 画像のパスを指定してください

    // 画像が読み込まれた後の処理
    image.onload = () => {
      this.ctx.drawImage(image, x, y, this.squareSize, this.squareSize);
    };
  }

  clearMap() {
    this.ctx.clearRect(
      0,
      0,
      this.width * this.squareSize,
      this.height * this.squareSize
    );
  }

  //画面更新メソッド
  updateDisplay() {
    //まず画面初期化
    this.clearMap();

    //ダンジョンの線を引く
    this.drawDungeon();

    //actorクラスのsetNextLocationメソッドにわたすmapObjを作成する
    this.setMapObj();

    //アクターリストにあるアクターをそれぞれ移動させる
    for (let i = 0; i < this.actorList.length; i++) {
      /* アクターの移動先を決定させる */

      this.actorList[i].setNextLocation(this.mapObj);

      /* アクターを描画 */
      this.drawActor(this.actorList[i]);
    }
  }

  //actorクラスのsetNextLocationメソッドにわたすmapObjを作成する
  setMapObj() {
    this.mapObj.width = this.width;
    this.mapObj.height = this.height;
  }
}

/* //////////////////////////////////////////////////////////////////// */
/* マップ上に置かれるキャラクタのクラス */
class actor {
  constructor() {
    this.location = {};
    this.location.previousRow = 0; //初回は0とする
    this.location.previousCol = 0; //初回は0とする
  }

  setLocation(row, col) {
    this.location.row = row;
    this.location.col = col;
  }

  setNextLocation(dungeonObj) {
    //8通りの移動先リストを用意
    let destList = [];

    for (let row = this.location.row - 1; row <= this.location.row + 1; row++) {
      for (
        let col = this.location.col - 1;
        col <= this.location.col + 1;
        col++
      ) {
        /* console.log(`row ${row}, col ${col}`); */

        //行先はオブジェクトとしてdestlist配列に追加
        let destObj = {};
        destObj.row = row;
        destObj.col = col;

        destList.push(destObj);
      }
    }

    //8通りの移動先リストをシャッフルする
    const shuffledDestList = this.shuffleArray(destList);

    console.log("---------------------------------------------------");
    console.log("移動先選定前の情報");
    console.log(
      `prow ${this.location.previousRow}, pcol ${this.location.previousCol}`
    );
    console.log(`row  ${this.location.row}, col  ${this.location.col}`);

    for (let i = 0; i < shuffledDestList.length; i++) {
      console.log(shuffledDestList[i]);
    }

    //配列を先頭から見て、進むべき道を決定する
    for (let i = 0; i < shuffledDestList.length; i++) {
      //移動先がブロックなら次 (未実装)
      /* if(){} */

      //移動先がマップ外なら次
      if (dungeonObj.width < shuffledDestList[i].col) {
        continue;
      }
      if (dungeonObj.height < shuffledDestList[i].row) {
        continue;
      }
      if (shuffledDestList[i].col <= 0) {
        continue;
      }
      if (shuffledDestList[i].row <= 0) {
        continue;
      }

      //移動先が以前いたところなら次
      if (
        shuffledDestList[i].col == this.location.previousCol &&
        shuffledDestList[i].row == this.location.previousRow
      ) {
        continue;
      }

      //移動先が変わらない場合は飛ばす
      if (
        shuffledDestList[i].col == this.location.col &&
        shuffledDestList[i].row == this.location.row
      ) {
        continue;
      }

      //元居た場所を記録する
      this.location.previousRow = this.location.row;
      this.location.previousCol = this.location.col;

      //条件にかからなかった座標を次の位置とする
      this.location.row = shuffledDestList[i].row;
      this.location.col = shuffledDestList[i].col;
      break;
    }

    console.log("移動先決定後の情報");
    console.log(
      `prow ${this.location.previousRow}, pcol ${this.location.previousCol}`
    );
    console.log(`row  ${this.location.row}, col  ${this.location.col}`);
  }

  //配列をシャッフルする
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //そのアクターのイメージを設定
  setImageFileName(name) {
    this.imageFileName = name;
  }
}

/* //////////////////////////////////////////////////////////////////// */
const main = async () => {
  //ダンジョンオブジェクトを作成
  const dungeonMap = new dungeonController();
  dungeonMap.setDungeonSize(8, 8);
  dungeonMap.setSquareSize(40);
  dungeonMap.setCanvas("myCanvas");

  //ダンジョンを初回描画
  dungeonMap.drawDungeon();

  //セラーナ
  const serana = new actor();
  serana.setLocation(2, 4);
  serana.setImageFileName("serana.jpg");
  dungeonMap.addActorToList(serana);
  dungeonMap.drawActor(serana);

  //ミラーク
  const miraak = new actor();
  miraak.setLocation(5, 5);
  miraak.setImageFileName("miraak.jpg");
  dungeonMap.addActorToList(miraak);
  dungeonMap.drawActor(miraak);

  //リディア
  const lydia = new actor();
  lydia.setLocation(5, 5);
  lydia.setImageFileName("lydia.jpg");
  dungeonMap.addActorToList(lydia);
  dungeonMap.drawActor(lydia);

  //ジェイザルゴ
  const jzargo = new actor();
  jzargo.setLocation(5, 5);
  jzargo.setImageFileName("jzargo.jpg");
  dungeonMap.addActorToList(jzargo);
  dungeonMap.drawActor(jzargo);

  //2秒ごとに移動画面を再描画する
  setInterval(() => {
    dungeonMap.updateDisplay();
  }, 2000);
};

main();
