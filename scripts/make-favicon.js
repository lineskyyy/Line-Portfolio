/**
 * Simple helper: generate public/favicon.ico from public/images/lkcs.png
 * Usage:
 *   npm install -D png-to-ico
 *   node scripts/make-favicon.js
 */
import fs from 'fs'
import path from 'path'

(async () => {
  try {
    // dynamically import to support both ESM and CJS exports
    const pngToIcoModule = await import('png-to-ico')
    const pngToIco = pngToIcoModule.default || pngToIcoModule

    const input = path.resolve(process.cwd(), 'public/images/lkcsw.png')
    const out = path.resolve(process.cwd(), 'public/favicon.ico')

    if (!fs.existsSync(input)) {
      console.error('Input PNG not found:', input)
      process.exit(1)
    }

    const buf = await pngToIco(input)
    fs.writeFileSync(out, buf)
    console.log('favicon.ico written to', out)
  } catch (err) {
    console.error('Failed to create favicon.ico:', err && err.message ? err.message : err)
    process.exit(1)
  }
})()
