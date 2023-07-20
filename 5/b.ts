const input = await Deno.readTextFile('./input.txt');

const processed = input
  .replace(/\r/g, '') // remove all \r characters
  .split('\n');

let largestX = Number.MIN_SAFE_INTEGER;
let largestY = Number.MIN_SAFE_INTEGER;

let smallestX = Number.MAX_SAFE_INTEGER;
let smallestY = Number.MAX_SAFE_INTEGER;

processed.map((line) => {
  line.split('->').map((r) => {
    const [x1, y1] = r
      .trim()
      .split(',')
      .map((v) => parseInt(v, 10));
    if (x1 > largestX) {
      largestX = x1;
    }
    if (y1 > largestY) {
      largestY = y1;
    }

    if (x1 < smallestX) {
      smallestX = x1;
    }

    if (y1 < smallestY) {
      smallestY = y1;
    }
  });
});

const matrix: number[][] = Array(largestX + 2 - smallestX)
  .fill(0)
  .map(() =>
    Array(largestY + 2 - smallestY)
      .fill(0)
      .map(() => 0)
  );

console.log(matrix.length, matrix[0].length, { smallestX, smallestY, largestX, largestY });

for (const line of processed) {
  const [s1, s2] = line.split('->');

  const [x1, y1] = s1
    .trim()
    .split(',')
    .map((v) => parseInt(v, 10));

  const [x2, y2] = s2
    .trim()
    .split(',')
    .map((v) => parseInt(v, 10));

  if (x1 === x2) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      matrix[i - smallestY][x1 - smallestX] += 1;
    }
  } else if (y1 === y2) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      matrix[y1 - smallestY][i - smallestX] += 1;
    }
  }
}

let totalCount = 0;

for (let i = 0; i < matrix.length; i++) {
  totalCount += matrix[i].filter((v) => v >= 2).length;
}

console.log(totalCount);
