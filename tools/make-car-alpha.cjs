const path = require('node:path');
const sharp = require('sharp');

const directory = path.resolve(__dirname, '../public/assets/estate-parking');
const model = process.argv[2] || 'porsche-911-gt3';
const variants = process.argv.slice(3).length ? process.argv.slice(3) : ['a', 'b', 'c', 'd', 'e'];

async function removeLightBackground(file) {
  const image = sharp(file);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const borderPixel = [data[0], data[1], data[2]];
  const darkBackground = Math.max(...borderPixel) < 12;
  const visited = new Uint8Array(width * height);
  const queue = [];
  const isBackground = index => {
    const red = data[index], green = data[index + 1], blue = data[index + 2];
    return darkBackground
      ? red < 12 && green < 12 && blue < 12
      : red > 238 && green > 238 && blue > 238 && Math.max(red, green, blue) - Math.min(red, green, blue) < 12;
  };
  const enqueue = (x, y) => {
    const pixel = y * width + x;
    const index = pixel * channels;
    if (visited[pixel] || !isBackground(index)) return;
    visited[pixel] = 1;
    queue.push(pixel);
  };

  for (let x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1); }
  for (let y = 1; y < height - 1; y++) { enqueue(0, y); enqueue(width - 1, y); }
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const pixel = queue[cursor], x = pixel % width, y = Math.floor(pixel / width);
    data[pixel * channels + 3] = 0;
    if (x) enqueue(x - 1, y);
    if (x + 1 < width) enqueue(x + 1, y);
    if (y) enqueue(x, y - 1);
    if (y + 1 < height) enqueue(x, y + 1);
  }
  await sharp(data, { raw: info }).png().toFile(`${file}.tmp.png`);
  await sharp(`${file}.tmp.png`).png().toFile(file);
}

Promise.all(variants.map(variant => removeLightBackground(path.join(directory, `${model}-${variant}.png`))))
  .catch(error => { console.error(error); process.exit(1); });
