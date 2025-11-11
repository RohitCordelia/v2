export function buildLayoutGrid(rooms: any) {
    let gridmap: any = {};
    let maxX = 0;
    let maxY = 0;
    rooms.forEach(function (room: any) {
      if (!gridmap[room.y]) {
        gridmap[room.y] = {};
      }
      gridmap[room.y][room.x] = room;
  
      if (room.y > maxX) maxX = room.y;
      if (room.x > maxY) maxY = room.x;
    });
    let gridString = [new Array(maxY + 1).fill("tri").join(" "),
    new Array(maxY + 1).fill("dck").join(" "),
    new Array(maxY + 1).fill("pre").join(" "),
    new Array(maxY + 1).fill("exp").join(" ")];
    let roomNo = 1;
    for (let x = 0; x <= maxX; x++) {
      let gridLine = "";
      for (let y = 0; y <= maxY; y++) {
        if (gridLine != "") {
          gridLine += " "
        }
        if (gridmap[x] && gridmap[x][y]) {
          if (gridmap[x][y].number.indexOf('lift') != -1) {
            gridLine += ("lift");
          } else {
            gridLine += ("r" + x + y);
          }
        } else {
          gridLine += ".";
        }
      }
      gridString.push(gridLine);
    }
    return gridString;
}