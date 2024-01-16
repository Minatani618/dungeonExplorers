let dungeon = [];

//まず1で全埋め
for (let row = 0; row < 10; row++) {
  let line = [];
  for (let col = 0; col < 10; col++) {
    line.push(0);
  }
  dungeon.push(line);
}

//
for (let row = 1; row < 9; row += 2) {
  for (let col = 1; col < 9; col += 2) {
    dungeon[row][col] = 1;
    //方向決め
    destID = Math.floor(Math.random() * 3);
    switch (destID) {
      case 0: //上
        dungeon[row - 1][col] = 1;
        break;
      case 1: //右
        dungeon[row][col + 1] = 1;
        break;
      case 2: //下
        dungeon[row + 1][col] = 1;
        break;

      default:
        break;
    }
  }
}

//印字
for (let i = 0; i < 10; i++) {
  let line = "";
  dungeon[i].map((num) => {
    line += num + " ";
  });
  console.log(line);
}
