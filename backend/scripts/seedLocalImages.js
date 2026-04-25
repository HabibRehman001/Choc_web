require('dotenv').config();
const fs = require('fs');
const path = require('path');

const connectDB = require('../src/db/db');
const Image = require('../src/models/images.model');

const assetsDir = path.resolve(__dirname, '../../src/assets');

const filesToSeed = [
  { name: 'slider1.png', altText: 'Premium dark chocolate slider image 1', tags: ['hero', 'seed-local'] },
  { name: 'slider2.png', altText: 'Premium dark chocolate slider image 2', tags: ['hero', 'seed-local'] },
  { name: 'slider 3.png', altText: 'Premium dark chocolate slider image 3', tags: ['hero', 'seed-local'] },
  { name: 'simpleChoc1.png', altText: 'Simple chocolate dropdown image 1', tags: ['nav-chocolates', 'seed-local'] },
  { name: 'simpleChoc2.png', altText: 'Simple chocolate dropdown image 2', tags: ['nav-chocolates', 'seed-local'] },
  { name: 'giftchoc1.png', altText: 'Gift chocolate dropdown image 1', tags: ['nav-gifting', 'seed-local'] },
  { name: 'cooperate.png', altText: 'Corporate gifting section image', tags: ['corporate', 'seed-local'] },
  { name: 'giftchoc2.png', altText: 'Gift chocolate dropdown image 2', tags: ['nav-gifting', 'seed-local'] },
  { name: 'occaschoc.png', altText: 'Occasion chocolate dropdown image 1', tags: ['nav-occasions', 'seed-local'] },
  { name: 'occaschoc2.png', altText: 'Occasion chocolate dropdown image 2', tags: ['nav-occasions', 'seed-local'] },
  { name: 'cake1.png', altText: 'Cake dropdown image 1', tags: ['nav-cakes', 'seed-local'] },
  { name: 'cake2.png', altText: 'Cake dropdown image 2', tags: ['nav-cakes', 'seed-local'] },
  { name: 'munchables1.png', altText: 'Munchables dropdown image 1', tags: ['nav-munchables', 'seed-local'] },
  { name: 'munchables.png', altText: 'Munchables dropdown image 2', tags: ['nav-munchables', 'seed-local'] },
  { name: 'ass1.png', altText: 'Accessories dropdown image 1', tags: ['nav-accessories', 'seed-local'] },
  { name: 'ass2.png', altText: 'Accessories dropdown image 2', tags: ['nav-accessories', 'seed-local'] },
  { name: 'wedding.png', altText: 'Wedding occasion image', tags: ['gfo-wedding', 'seed-local'] },
  { name: 'birthday.png', altText: 'Birthday occasion image', tags: ['gfo-birthday', 'seed-local'] },
  { name: 'baby.png', altText: 'Newborn occasion image', tags: ['gfo-newborn', 'seed-local'] },
  { name: 'love.png', altText: 'Just love occasion image', tags: ['gfo-love', 'seed-local'] },
  { name: 'bestsell.png', altText: 'Best selling section image', tags: ['bestsell', 'seed-local'] },
  { name: 'hamper.png', altText: 'Hamper section image', tags: ['hamper-banner', 'seed-local'] },
  { name: 'pistasiokunafa.png', altText: 'Chocolate bars pistachio image', tags: ['fp-bars-pitashhio', 'seed-local'] },
  { name: 'sugarfree.png', altText: 'Chocolate bars sugar free image', tags: ['fp-bars-sugarfree', 'seed-local'] },
  { name: 'darkchoc', altText: 'Chocolate bars dark chocolate image', tags: ['fp-bars-darkchoc', 'seed-local'] },
  { name: 'hazelnut.png', altText: 'Chocolate bars hazelnut image', tags: ['fp-bars-hazelnut', 'seed-local'] },
  { name: 'boxof9.png', altText: 'Chocolate boxes signature box of 9 image', tags: ['fp-boxes-boxof9', 'seed-local'] },
  { name: 'boxof16.png', altText: 'Chocolate boxes assorted gift box of 16 image', tags: ['fp-boxes-boxof16', 'seed-local'] },
  { name: 'DarkTruffle.png', altText: 'Chocolate boxes dark truffle image', tags: ['fp-boxes-darktruffle', 'seed-local'] },
  { name: 'praline.png', altText: 'Chocolate boxes praline image', tags: ['fp-boxes-praline', 'seed-local'] },
  { name: 'hamp1.png', altText: 'Gift hampers classic hamper image', tags: ['fp-hampers-classic', 'seed-local'] },
  { name: 'hamp2.png', altText: 'Gift hampers luxury hamper image', tags: ['fp-hampers-luxury', 'seed-local'] },
  { name: 'hamp3.png', altText: 'Gift hampers birthday hamper image', tags: ['fp-hampers-birthday', 'seed-local'] },
  { name: 'hamp4.png', altText: 'Gift hampers corporate hamper image', tags: ['fp-hampers-corporate', 'seed-local'] },
  { name: 'berrycreamcake.png', altText: 'Cakes berry cream image', tags: ['fp-cakes-berrycream', 'seed-local'] },
  { name: 'Eid.png', altText: 'Cakes eid bento image', tags: ['fp-cakes-eid', 'seed-local'] },
  { name: 'lemon.png', altText: 'Cakes lemon cream image', tags: ['fp-cakes-lemon', 'seed-local'] },
  { name: 'vanilla.png', altText: 'Cakes vanilla naked image', tags: ['fp-cakes-vanilla', 'seed-local'] },
];

const getMimeType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName).toLowerCase();
  if (baseName === 'darkchoc') return 'image/png';
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
      tags: file.tags,
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
