const { spawn } = require('child_process');
const path = require('path');

// Usage: node scripts/tailwind-run.js [--watch] [--minify] [...other flags]
const args = process.argv.slice(2);

const projectRoot = path.resolve(__dirname, '..');
const input = path.join(projectRoot, 'src', 'input.css');
const output = path.join(projectRoot, 'dist', 'output.css');

// Build the npm exec command to run the tailwind CLI from the registry/package
const npmArgs = ['exec', '--package=tailwindcss', '--', 'tailwindcss', '-i', input, '-o', output, ...args];

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
console.log('Spawning:', npmCmd, npmArgs.join(' '));
try {
  const proc = spawn(npmCmd, npmArgs, { stdio: 'inherit' });

  proc.on('exit', (code) => {
    process.exit(code);
  });

  proc.on('error', (err) => {
    console.error('Failed to start npm exec:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Spawn threw:', err);
  process.exit(1);
}

proc.on('exit', (code) => {
  process.exit(code);
});

proc.on('error', (err) => {
  console.error('Failed to start npm exec:', err);
  process.exit(1);
});
