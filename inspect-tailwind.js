try {
  const lib = require('tailwindcss/dist/lib');
  console.log('Export keys:', Object.keys(lib));
  console.log('Has compile:', typeof lib.compile === 'function');
  for (const k of Object.keys(lib)) {
    console.log(k, typeof lib[k]);
  }
} catch (err) {
  console.error('Require error:', err && err.stack ? err.stack : err);
  process.exit(1);
}
