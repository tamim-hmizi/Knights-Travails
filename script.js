function knightMoves(start, end) {
    const moves = [
      [-2, -1], [-1, -2], [1, -2], [2, -1],
      [-2, 1], [-1, 2], [1, 2], [2, 1]
    ];
  
    function isValidMove(x, y) {
      return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
  
    function getNeighbors([x, y]) {
      return moves.map(([dx, dy]) => [x + dx, y + dy]).filter(([nx, ny]) => isValidMove(nx, ny));
    }
  
    function bfs() {
      const queue = [[...start, 0]];
      const visited = new Set([start.toString()]);
  
      while (queue.length > 0) {
        const [x, y, steps] = queue.shift();
  
        if (x === end[0] && y === end[1]) {
          const path = [[x, y]];
          let current = [x, y];
  
          for (let i = steps; i > 0; i--) {
            const neighbors = getNeighbors(current);
            const next = neighbors.find(([nx, ny]) => distances[nx][ny] === i - 1);
            path.unshift(next);
            current = next;
          }
  
          return path;
        }
  
        const neighbors = getNeighbors([x, y]);
        for (const [nx, ny] of neighbors) {
          const key = `${nx},${ny}`;
          if (!visited.has(key)) {
            visited.add(key);
            queue.push([nx, ny, steps + 1]);
            distances[nx][ny] = steps + 1;
          }
        }
      }
  
      return null;
    }
  
    const distances = Array.from({ length: 8 }, () => Array(8).fill(Number.MAX_SAFE_INTEGER));
    distances[start[0]][start[1]] = 0;
  
    const path = bfs();
  
    if (path) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(coord => console.log(coord));
      return path;
    } else {
      console.log("No valid path found.");
      return null;
    }
  }
  
  // Example usage:
  knightMoves([3,3],[4,3]);
  