import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Nike Air Max 270',
    description: 'Iconic silhouette with the largest Air unit yet for all-day comfort and street-ready style.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop',
    stockQuantity: 20,
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Responsive Boost cushioning meets a Primeknit+ upper for the ultimate running experience.',
    price: 920,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop',
    stockQuantity: 15,
  },
  {
    name: 'Jordan 1 Retro High OG',
    description: 'The shoe that started it all. Premium leather upper with classic colorblocking.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&auto=format&fit=crop',
    stockQuantity: 8,
  },
  {
    name: 'Puma RS-X Puzzle',
    description: 'Bold retro-running sneaker with chunky sole and vibrant panel design.',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop',
    stockQuantity: 25,
  },
  {
    name: 'New Balance 574 Classic',
    description: 'A timeless silhouette with ENCAP midsole technology for lasting support.',
    price: 720,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop',
    stockQuantity: 18,
  },
  {
    name: 'Vans Old Skool',
    description: 'The original skate shoe — low-profile canvas and suede upper with iconic side stripe.',
    price: 480,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop',
    stockQuantity: 30,
  },
  {
    name: 'Converse Chuck Taylor All Star',
    description: 'The legendary hi-top canvas sneaker. A cultural icon since 1917.',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&auto=format&fit=crop',
    stockQuantity: 35,
  },
  {
    name: 'Reebok Classic Leather',
    description: 'Clean, crisp leather upper with a lightweight EVA midsole for all-day wear.',
    price: 560,
    imageUrl: 'https://images.unsplash.com/photo-1584735175315-9d5df23be7cc?w=600&auto=format&fit=crop',
    stockQuantity: 12,
  },
  {
    name: 'Nike Air Force 1 Low',
    description: 'Court-tested, street-approved. Pure white leather with Nike Air cushioning.',
    price: 780,
    imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&auto=format&fit=crop',
    stockQuantity: 22,
  },
  {
    name: 'Adidas Stan Smith',
    description: 'The iconic tennis shoe reimagined for off-court style. Minimal and timeless.',
    price: 620,
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961a28f?w=600&auto=format&fit=crop',
    stockQuantity: 28,
  },
  {
    name: 'Salomon XA Pro Trail Runner',
    description: 'Built for the trails. Aggressive grip outsole and protective toe cap.',
    price: 980,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop',
    stockQuantity: 10,
  },
  {
    name: 'Clarks Desert Boot',
    description: 'The original desert boot. Suede upper and natural crepe sole for casual formal wear.',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop',
    stockQuantity: 14,
  },
];

async function main() {
  console.log('Seeding products...');
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: products.indexOf(p) + 1 },
      update: p,
      create: p,
    });
  }
  console.log(`✅ Seeded ${products.length} products.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
