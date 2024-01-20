/* //////////////////////////////////////////////////////////////////// */
/* ダンジョンコントロールクラス */
class dungeonController {
  constructor() {
    this.actorList = [];
    this.mapObj = {};
    this.setMap();
  }

  //ダンジョンの縦横のマス数を決める
  setDungeonSize(width, height) {
    this.width = width;
    this.height = height;
  }

  //ダンジョンの構成配列
  setMap() {
    this.map = [];
    /* this.map = [
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]; */

    //まず1で全埋め
    for (let row = 0; row < 20; row++) {
      let line = [];
      for (let col = 0; col < 20; col++) {
        line.push(0);
      }
      this.map.push(line);
    }

    //
    for (let row = 1; row < 19; row += 2) {
      for (let col = 1; col < 19; col += 2) {
        this.map[row][col] = 1;
        //方向決め
        let destID = Math.floor(Math.random() * 3);
        switch (destID) {
          case 0: //上
            this.map[row - 1][col] = 1;
            break;
          case 1: //右
            this.map[row][col + 1] = 1;
            break;
          case 2: //下
            this.map[row + 1][col] = 1;
            break;

          default:
            break;
        }
      }
    }

    //印字
    for (let i = 0; i < 20; i++) {
      let line = "";
      this.map[i].map((num) => {
        line += num + " ";
      });
      console.log(line);
    }
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
    //壁を描画
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.map[row][col] != 1) {
          continue;
        }
        let x = col * this.squareSize;
        let y = row * this.squareSize;
        this.ctx.fillStyle = "brown";
        this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
        this.ctx.fill(); //図形を描画
      }
    }
    //線を描画
    //縦
    for (let row = 0; row <= this.height; row++) {
      let startX = 0;
      let startY = row * this.squareSize;
      let endX = this.width * this.squareSize;
      let endY = row * this.squareSize;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY); //線を引く
    }
    //横
    for (let col = 0; col <= this.width; col++) {
      let startX = col * this.squareSize;
      let startY = 0;
      let endX = col * this.squareSize;
      let endY = this.height * this.squareSize;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY); //線を引く
    }
    this.ctx.stroke();
  }

  addActorToList(actor) {
    this.actorList.push(actor);
  }

  //アクターの初回描画
  drawActorFirst(actor) {
    //actorの描画位置の左上座標を指定
    this.ctx.beginPath();
    let x = (actor.location.col - 1) * this.squareSize;
    let y = (actor.location.row - 1) * this.squareSize;

    // 画像の読み込み
    let image = new Image();
    image.src = actor.imageFileName; // 画像のパスを指定してください

    // 画像が読み込まれた後の処理
    image.onload = () => {
      this.ctx.drawImage(image, x, y, this.squareSize, this.squareSize);
    };
  }

  //アクターを描画
  drawActor(actorList) {
    //同一場所にアクターがいるかを反映した描画用リストを作成
    let drawingLocationList = []; //描画用リスト
    for (let i = 0; i < actorList.length; i++) {
      //描画用リストに入れ込むオブジェクト
      let obj = {
        row: actorList[i].location.row,
        col: actorList[i].location.col,
        nameArr: [actorList[i].name],
      };

      //アクターが同一の場所にいるか判定
      let sameLocation = false;
      for (let j = 0; j < drawingLocationList.length; j++) {
        if (
          drawingLocationList[j].row == obj.row &&
          drawingLocationList[j].col == obj.col
        ) {
          //同一場所にいれば描画用リストのnamearrに追記
          drawingLocationList[j].nameArr.push(obj.nameArr[0]);
          sameLocation = true;
        }
      }

      //同一場所にいるアクターがいないならそのまま配列に追加
      if (!sameLocation) {
        drawingLocationList.push(obj);
      }
    }

    console.log(drawingLocationList);

    //描画用リストを順に確認してアクター描画
    for (let i = 0; i < drawingLocationList.length; i++) {
      //ロケーションにアクター一人の時
      if (drawingLocationList[i].nameArr.length == 1) {
        for (let j = 0; j < this.actorList.length; j++) {
          if (drawingLocationList[i].nameArr[0] == this.actorList[j].name) {
            //actorの描画位置の左上座標を指定
            this.ctx.beginPath();
            let x = (this.actorList[j].location.col - 1) * this.squareSize;
            let y = (this.actorList[j].location.row - 1) * this.squareSize;

            // 画像の読み込み
            let image = new Image();
            image.src = this.actorList[j].imageFileName; // 画像のパスを指定してください

            // 画像が読み込まれた後の処理
            image.onload = () => {
              this.ctx.drawImage(image, x, y, this.squareSize, this.squareSize);
            };
          }
        }
      }

      //ロケーションにアクターが複数いるとき
      if (drawingLocationList[i].nameArr.length > 1) {
        for (let j = 0; j < drawingLocationList[i].nameArr.length; j++) {
          //同一場所上の何人目かによって表示位置オフセットを設定
          let offsetX = 0;
          let offsetY = 0;
          switch (j) {
            case 0:
              break;
            case 1:
              offsetX = this.squareSize / 2;
              break;
            case 2:
              offsetY = this.squareSize / 2;
              break;
            case 3:
              offsetX = this.squareSize / 2;
              offsetY = this.squareSize / 2;
              break;
            default:
              continue;
              break;
          }

          //描画するアクターをアクターリストと突き合わせて指定
          for (let k = 0; k < this.actorList.length; k++) {
            if (drawingLocationList[i].nameArr[j] == this.actorList[k].name) {
              //actorの描画位置の左上座標を指定
              this.ctx.beginPath();
              let x =
                (this.actorList[k].location.col - 1) * this.squareSize +
                offsetX;
              let y =
                (this.actorList[k].location.row - 1) * this.squareSize +
                offsetY;
              // 画像の読み込み
              let image = new Image();
              image.src = this.actorList[k].imageFileName; // 画像のパスを指定してください

              // 画像が読み込まれた後の処理
              image.onload = () => {
                this.ctx.drawImage(
                  image,
                  x,
                  y,
                  this.squareSize / 2,
                  this.squareSize / 2
                );
              };
            }
          }
        }
      }
    }
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

    //アクターリストにあるアクターの移動先を決定
    for (let i = 0; i < this.actorList.length; i++) {
      /* アクターの移動先を決定させて配列格納 */
      this.actorList[i].setNextLocation(this.mapObj);
    }

    /* アクターを描画 */
    /* for (let i = 0; i < this.actorList.length; i++) {
    } */
    this.drawActor(this.actorList);
  }

  //actorクラスのsetNextLocationメソッドにわたすmapObjを作成する
  setMapObj() {
    this.mapObj.width = this.width;
    this.mapObj.height = this.height;
    this.mapObj.map = this.map;
  }
}

/* //////////////////////////////////////////////////////////////////// */
/* マップ上に置かれるキャラクタのクラス */
class actor {
  constructor(name) {
    this.name = name;
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
        //行先はオブジェクトとしてdestlist配列に追加
        let destObj = {};
        destObj.row = row;
        destObj.col = col;

        destList.push(destObj);
      }
    }

    //8通りの移動先リストをシャッフルする
    const shuffledDestList = this.shuffleArray(destList);

    let sheIsStop = true; //行き止まりで進めなかったかどうかのフラグ

    //配列を先頭から見て、進むべき道を決定する
    for (let i = 0; i < shuffledDestList.length; i++) {
      //移動先がマップ外なら次
      if (dungeonObj.width < shuffledDestList[i].col) {
        continue;
      }
      if (dungeonObj.height < shuffledDestList[i].row) {
        continue;
      }
      if (shuffledDestList[i].col <= 0) {
        console.log("col reset");
        continue;
      }
      if (shuffledDestList[i].row <= 0) {
        console.log("row reset");
        continue;
      }

      //移動先がブロックなら次
      if (
        dungeonObj.map[shuffledDestList[i].row - 1][
          shuffledDestList[i].col - 1
        ] == 1
      ) {
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
      sheIsStop = false;
      break;
    }

    //行き止まりの時に足踏みする
    if (sheIsStop) {
      this.location.previousCol = this.location.col;
      this.location.previousRow = this.location.row;
    }
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
  dungeonMap.setDungeonSize(20, 20);
  dungeonMap.setSquareSize(40);
  dungeonMap.setCanvas("myCanvas");

  //ダンジョンを初回描画
  dungeonMap.drawDungeon();

  //セラーナ
  const serana = new actor("serana");
  serana.setLocation(5, 5);
  serana.setImageFileName("serana.jpg");
  dungeonMap.addActorToList(serana);
  dungeonMap.drawActorFirst(serana);

  //ミラーク
  const miraak = new actor("miraak");
  miraak.setLocation(5, 6);
  miraak.setImageFileName("miraak.jpg");
  dungeonMap.addActorToList(miraak);
  dungeonMap.drawActorFirst(miraak);

  //リディア
  const lydia = new actor("lydia");
  lydia.setLocation(5, 7);
  lydia.setImageFileName("lydia.jpg");
  dungeonMap.addActorToList(lydia);
  dungeonMap.drawActorFirst(lydia);

  //ジェイザルゴ
  const jzargo = new actor("jzargo");
  jzargo.setLocation(5, 8);
  jzargo.setImageFileName("jzargo.jpg");
  dungeonMap.addActorToList(jzargo);
  dungeonMap.drawActorFirst(jzargo);

  //スシェーナ
  const susena = new actor("susena");
  susena.setLocation(6, 5);
  susena.setImageFileName("susena.jpg");
  dungeonMap.addActorToList(susena);
  dungeonMap.drawActorFirst(susena);

  //デリラ
  const delira = new actor("delira");
  delira.setLocation(6, 7);
  delira.setImageFileName("delira.jpg");
  dungeonMap.addActorToList(delira);
  dungeonMap.drawActorFirst(delira);

  //イェヴァ
  const yeva = new actor("yeva");
  yeva.setLocation(6, 8);
  yeva.setImageFileName("yeva.jpg");
  dungeonMap.addActorToList(yeva);
  dungeonMap.drawActorFirst(yeva);

  //ペイ
  const pei = new actor("pei");
  pei.setLocation(6, 6);
  pei.setImageFileName("pei.jpg");
  dungeonMap.addActorToList(pei);
  dungeonMap.drawActorFirst(pei);

  //2秒ごとに移動画面を再描画する
  setInterval(() => {
    dungeonMap.updateDisplay();
  }, 2000);
};

main();
