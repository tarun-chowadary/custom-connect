import { Category, Request, User, Proposal, ShowcaseItem } from '@/types';

// Import category images
import categoryGlassware from '@/assets/category-glassware.jpg';
import categoryHomeDecor from '@/assets/category-home-decor.jpg';
import categoryJewelry from '@/assets/category-jewelry.jpg';
import categoryLeather from '@/assets/category-leather.jpg';

// Import showcase images
import showcaseGlassVase from '@/assets/showcase-glass-vase.jpg';
import showcaseWoodenJournal from '@/assets/showcase-wooden-journal.jpg';
import showcaseLeatherWallet from '@/assets/showcase-leather-wallet.jpg';
import showcase3dJewelry from '@/assets/showcase-3d-jewelry.jpg';
import showcaseBrassLamp from '@/assets/showcase-brass-lamp.jpg';
import showcaseFountainPen from '@/assets/showcase-fountain-pen.jpg';
import showcaseSilkScarf from '@/assets/showcase-silk-scarf.jpg';
import showcasePhoneStand from '@/assets/showcase-phone-stand.jpg';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Home Decor',
    slug: 'home-decor',
    icon: '🏠',
    description: 'Custom furniture, lighting, and decorative pieces',
    requestCount: 0,
    image: categoryHomeDecor,
    showcaseItems: [
      {
        id: 'showcase-1',
        name: 'Artisan Brass Lamp',
        description: 'Hand-crafted brass lamp with intricate geometric cutwork',
        image: showcaseBrassLamp,
        categoryId: '1',
      },
      {
        id: 'showcase-2',
        name: 'Hand-blown Glass Vase',
        description: 'Elegant swirling patterns in warm amber and teal',
        image: showcaseGlassVase,
        categoryId: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Stationery',
    slug: 'stationery',
    icon: '✏️',
    description: 'Pens, notebooks, desk accessories',
    requestCount: 0,
    image: categoryGlassware,
    showcaseItems: [
      {
        id: 'showcase-3',
        name: 'Hand-turned Fountain Pen',
        description: 'Custom calligraphy pen with premium wooden body',
        image: showcaseFountainPen,
        categoryId: '2',
      },
      {
        id: 'showcase-4',
        name: 'Engraved Wooden Journal',
        description: 'Leather-bound journal with hand-engraved wooden cover',
        image: showcaseWoodenJournal,
        categoryId: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Jewelry',
    slug: 'jewelry',
    icon: '💎',
    description: 'Rings, necklaces, bracelets, and more',
    requestCount: 0,
    image: categoryJewelry,
    showcaseItems: [
      {
        id: 'showcase-5',
        name: '3D-Printed Geometric Pendant',
        description: 'Modern minimalist design in rose gold finish',
        image: showcase3dJewelry,
        categoryId: '3',
      },
    ],
  },
  {
    id: '4',
    name: 'Glassware',
    slug: 'glassware',
    icon: '🥂',
    description: 'Custom glass art, vases, and drinking vessels',
    requestCount: 0,
    image: categoryGlassware,
    showcaseItems: [
      {
        id: 'showcase-6',
        name: 'Artisan Glass Vase',
        description: 'Hand-blown with swirling amber and emerald patterns',
        image: showcaseGlassVase,
        categoryId: '4',
      },
    ],
  },
  {
    id: '5',
    name: 'Art & Prints',
    slug: 'art-prints',
    icon: '🎨',
    description: 'Paintings, illustrations, and custom prints',
    requestCount: 0,
    image: categoryHomeDecor,
    showcaseItems: [],
  },
  {
    id: '6',
    name: 'Fashion',
    slug: 'fashion',
    icon: '👗',
    description: 'Custom clothing, accessories, and footwear',
    requestCount: 0,
    image: categoryLeather,
    showcaseItems: [
      {
        id: 'showcase-7',
        name: 'Handwoven Silk Scarf',
        description: 'Traditional patterns in vibrant jewel tones',
        image: showcaseSilkScarf,
        categoryId: '6',
      },
    ],
  },
  {
    id: '7',
    name: 'Gadgets',
    slug: 'gadgets',
    icon: '⚙️',
    description: 'Custom tech accessories and 3D printed items',
    requestCount: 0,
    image: categoryGlassware,
    showcaseItems: [
      {
        id: 'showcase-8',
        name: 'Organic Phone Stand',
        description: '3D-printed flowing design in matte white',
        image: showcasePhoneStand,
        categoryId: '7',
      },
    ],
  },
  {
    id: '8',
    name: 'Leather Goods',
    slug: 'leather-goods',
    icon: '👜',
    description: 'Wallets, bags, belts, and leather accessories',
    requestCount: 0,
    image: categoryLeather,
    showcaseItems: [
      {
        id: 'showcase-9',
        name: 'Embossed Leather Wallet',
        description: 'Premium leather with intricate mandala embossing',
        image: showcaseLeatherWallet,
        categoryId: '8',
      },
    ],
  },
  {
    id: 'others',
    name: 'Others',
    slug: 'others',
    icon: '➕',
    description: 'Custom items that don\'t fit other categories',
    requestCount: 0,
    image: categoryHomeDecor,
    showcaseItems: [],
  },
];

export const featuredMakers: User[] = [];

export const sampleRequests: Request[] = [];

export const sampleProposals: Proposal[] = [];