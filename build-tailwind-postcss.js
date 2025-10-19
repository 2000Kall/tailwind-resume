const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(__dirname, '..');
const inputPath = path.join(projectRoot, 'src', 'input.css');
const outputPath = path.join(projectRoot, 'dist', 'output.css');

async function build() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Input CSS not found:', inputPath);
      process.exit(1);
    }

    const css = fs.readFileSync(inputPath, 'utf8');

    const processor = postcss([tailwind, autoprefixer]);
    const result = await processor.process(css, { from: inputPath, to: outputPath });

    // Ensure dist exists
    const distDir = path.dirname(outputPath);
    if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

    fs.writeFileSync(outputPath, result.css, 'utf8');
    if (result.map) fs.writeFileSync(outputPath + '.map', result.map.toString(), 'utf8');

    console.log('Built', outputPath);
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

build();
