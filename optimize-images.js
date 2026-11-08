const sharp = require("sharp");

async function optimize() {
  await sharp("public/shiv.webp")
    .resize({
      width: 1000,
      withoutEnlargement: true,
    })
    .webp({
      quality: 70,
      effort: 6,
    })
    .toFile("public/shiv-optimized.webp");

  console.log("Shiva image optimized!");
}

optimize();