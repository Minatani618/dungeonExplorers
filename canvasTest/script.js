// JavaScriptで100マスを描画する関数
function drawGrid() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const squareSize = 50; // マスのサイズ
  const numRows = 10; // 行数
  const numCols = 10; // 列数

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * squareSize;
      const y = row * squareSize;

      // マスの描画
      ctx.fillStyle = (row + col) % 2 === 0 ? "#CCCCCC" : "#FFFFFF"; // マスの色を交互に変更
      ctx.fillRect(x, y, squareSize, squareSize);

      // マスに枠線を追加する場合は次の行を有効にする
      // ctx.strokeStyle = '#000';
      // ctx.strokeRect(x, y, squareSize, squareSize);
    }
  }
}

drawGrid();
