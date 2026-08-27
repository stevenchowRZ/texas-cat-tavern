const path = require('node:path');
const sharp = require('sharp');

const model = process.argv[2];
const variants = process.argv.slice(3);
if (!model || !variants.length) throw new Error('Usage: node normalize-car-sprites.cjs <model> <variant...>');

const directory = path.resolve(__dirname, '../public/assets/estate-parking');
const fileFor = variant => path.join(directory, `${model}-${variant}.png`);

async function readSprite(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

function alphaBox({ data, info }) {
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 12) {
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

function defringe(sprite) {
  const { data, info } = sprite;
  const source = Buffer.from(data);
  for (let y = 1; y < info.height - 1; y++) for (let x = 1; x < info.width - 1; x++) {
    const index = (y * info.width + x) * 4;
    const alpha = source[index + 3];
    if (!alpha || alpha === 255 || source[index] < 230 || source[index + 1] < 230 || source[index + 2] < 230) continue;
    let candidate = -1, candidateAlpha = 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const nearby = ((y + dy) * info.width + x + dx) * 4;
      const nearbyAlpha = source[nearby + 3];
      if (nearbyAlpha > candidateAlpha && nearbyAlpha > alpha && (source[nearby] < 220 || source[nearby + 1] < 220 || source[nearby + 2] < 220)) {
        candidate = nearby; candidateAlpha = nearbyAlpha;
      }
    }
    if (candidate >= 0) {
      data[index] = source[candidate]; data[index + 1] = source[candidate + 1]; data[index + 2] = source[candidate + 2];
    }
  }
}

async function normalize() {
  const reference = await readSprite(fileFor('c'));
  const referenceBox = alphaBox(reference);
  const canvas = { width: reference.info.width, height: reference.info.height };
  const targetCenterX = referenceBox.left + referenceBox.width / 2;
  const targetCenterY = referenceBox.top + referenceBox.height / 2;

  for (const variant of variants) {
    const sprite = await readSprite(fileFor(variant));
    defringe(sprite);
    const box = alphaBox(sprite);
    const scale = referenceBox.height / box.height;
    const width = Math.round(box.width * scale);
    const height = referenceBox.height;
    const left = Math.round(targetCenterX - width / 2);
    const top = Math.round(targetCenterY - height / 2);
    const cleaned = await sharp(sprite.data, { raw: sprite.info }).extract({ left: box.left, top: box.top, width: box.width, height: box.height }).resize(width, height).png().toBuffer();
    await sharp({ create: { width: canvas.width, height: canvas.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: cleaned, left, top }]).png().toFile(fileFor(variant));
  }
}

normalize().catch(error => { console.error(error); process.exit(1); });
