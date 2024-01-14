// Canvas要素を取得
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// 画像の読み込み
var image = new Image();
image.src = "serana.jpg"; // 画像のパスを指定してください

// 画像が読み込まれた後の処理
image.onload = function () {
  // Canvasに画像を描画
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};
