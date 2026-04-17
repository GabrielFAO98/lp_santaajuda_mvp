const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
const files = fs.readdirSync(imgDir).filter(f => /\.(jpe?g|png)$/i.test(f));

(async () => {
  let totalAntes = 0, totalDepois = 0;

  for (const file of files) {
    const input = path.join(imgDir, file);
    const output = path.join(imgDir, path.basename(file, path.extname(file)) + '.webp');

    const antes = fs.statSync(input).size;
    await sharp(input).webp({ quality: 80 }).toFile(output);
    const depois = fs.statSync(output).size;

    totalAntes += antes;
    totalDepois += depois;

    const reducao = (((antes - depois) / antes) * 100).toFixed(0);
    console.log(`✓ ${file} → ${path.basename(output)}  (${(antes/1024).toFixed(0)}KB → ${(depois/1024).toFixed(0)}KB, -${reducao}%)`);
  }

  console.log(`\nTotal: ${(totalAntes/1024/1024).toFixed(2)}MB → ${(totalDepois/1024/1024).toFixed(2)}MB (-${(((totalAntes-totalDepois)/totalAntes)*100).toFixed(0)}%)`);
})();
