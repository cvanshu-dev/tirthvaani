import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public";
const outputDir = "./public-optimized";

const supported = [".jpg", ".jpeg", ".png"];

async function optimize(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await optimize(fullPath);
      continue;
    }

    if (!supported.includes(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    const relative = path.relative(inputDir, fullPath);
    const outputPath = path.join(
      outputDir,
      relative.replace(/\.[^.]+$/, ".webp")
    );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    await sharp(fullPath)
      .rotate()
      .webp({ quality: 80, effort: 5 })
      .toFile(outputPath);

    console.log(`Optimised: ${relative}`);
  }
}

await optimize(inputDir);

console.log("Image optimisation completed!");