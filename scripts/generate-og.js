const sharp = require('sharp');
const path = require('path');

async function generate() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const size = 260;

  // Create a clean circular mask for the logo
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff" /></svg>`
  );

  const circularLogo = await sharp(logoPath)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const svgCanvas = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0B0F19"/>
      
      <!-- Subtle clean radial glow on the left -->
      <radialGradient id="glow" cx="22%" cy="50%" r="45%">
        <stop offset="0%" stop-color="#1A73E8" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0B0F19" stop-opacity="0"/>
      </radialGradient>
      <rect width="1200" height="630" fill="url(#glow)"/>

      <!-- Circular decorative ring behind logo -->
      <circle cx="250" cy="315" r="136" fill="none" stroke="#38BDF8" stroke-opacity="0.3" stroke-width="2"/>

      <!-- Left Typography (Clean Brand Name + Slogan + Domain) -->
      <text x="430" y="275" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="74" font-weight="900" fill="#FFFFFF" letter-spacing="-1.5">
        Apti<tspan fill="#38BDF8">Test</tspan>
      </text>

      <text x="430" y="348" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#94A3B8" letter-spacing="-0.5">
        Know Your Potential
      </text>

      <!-- URL Badge -->
      <rect x="430" y="398" width="260" height="46" rx="23" fill="rgba(56, 189, 248, 0.12)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.5"/>
      <text x="560" y="428" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="#38BDF8" text-anchor="middle" dominant-baseline="middle">
        ur.aptitue.vercel.app
      </text>
    </svg>
  `);

  await sharp(svgCanvas)
    .composite([
      {
        input: circularLogo,
        top: 315 - size / 2,
        left: 250 - size / 2
      }
    ])
    .png()
    .toFile(path.join(process.cwd(), 'public', 'og-image.png'));

  await sharp(path.join(process.cwd(), 'public', 'og-image.png'))
    .jpeg({ quality: 95 })
    .toFile(path.join(process.cwd(), 'public', 'og-image.jpg'));

  console.log('Successfully generated circular masked og-image.png and og-image.jpg');
}

generate().catch(console.error);
