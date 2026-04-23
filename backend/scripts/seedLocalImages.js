require('dotenv').config();
const fs = require('fs');
const path = require('path');

const connectDB = require('../src/db/db');
const Image = require('../src/models/images.model');

const assetsDir = path.resolve(__dirname, '../../Choc_web/src/assets');

const filesToSeed = [
  { name: 'slider1.png', altText: 'Premium dark chocolate slider image 1' },
  { name: 'slider2.png', altText: 'Premium dark chocolate slider image 2' },
  { name: 'slider 3.png', altText: 'Premium dark chocolate slider image 3' },
];

const sharedTags = [
  'hero',
  'featured',
  'occasions',
  'corporate',
  'sell-banner',
  'hamper-banner',
  'instagram',
  'nav',
  'seed-local',
];

const getMimeType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
};

const seed = async () => {
  await connectDB();

  await Image.deleteMany({ tags: 'seed-local' });

  const docs = filesToSeed.map((file, index) => {
    const fullPath = path.join(assetsDir, file.name);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing file: ${fullPath}`);
    }

    const buffer = fs.readFileSync(fullPath);

    return {
      originalName: file.name,
      fileName: `seed-${index + 1}-${file.name}`,
      mimeType: getMimeType(file.name),
      size: buffer.length,
      altText: file.altText,
      tags: sharedTags,
      data: buffer,
      isActive: true,
    };
  });

  await Image.insertMany(docs);

  console.log(`Seeded ${docs.length} local images successfully.`);
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
