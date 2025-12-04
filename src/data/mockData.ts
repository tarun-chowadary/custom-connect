import { Category, Request, User, Proposal } from '@/types';

// Import images
import categoryGlassware from '@/assets/category-glassware.jpg';
import categoryHomeDecor from '@/assets/category-home-decor.jpg';
import categoryJewelry from '@/assets/category-jewelry.jpg';
import categoryLeather from '@/assets/category-leather.jpg';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Home Decor',
    slug: 'home-decor',
    icon: '🏠',
    description: 'Custom furniture, lighting, and decorative pieces',
    requestCount: 0,
    image: categoryHomeDecor,
  },
  {
    id: '2',
    name: 'Stationery',
    slug: 'stationery',
    icon: '✏️',
    description: 'Pens, notebooks, desk accessories',
    requestCount: 0,
    image: categoryGlassware,
  },
  {
    id: '3',
    name: 'Jewelry',
    slug: 'jewelry',
    icon: '💎',
    description: 'Rings, necklaces, bracelets, and more',
    requestCount: 0,
    image: categoryJewelry,
  },
  {
    id: '4',
    name: 'Glassware',
    slug: 'glassware',
    icon: '🥂',
    description: 'Custom glass art, vases, and drinking vessels',
    requestCount: 0,
    image: categoryGlassware,
  },
  {
    id: '5',
    name: 'Art & Prints',
    slug: 'art-prints',
    icon: '🎨',
    description: 'Paintings, illustrations, and custom prints',
    requestCount: 0,
    image: categoryHomeDecor,
  },
  {
    id: '6',
    name: 'Fashion',
    slug: 'fashion',
    icon: '👗',
    description: 'Custom clothing, accessories, and footwear',
    requestCount: 0,
    image: categoryLeather,
  },
  {
    id: '7',
    name: 'Gadgets',
    slug: 'gadgets',
    icon: '⚙️',
    description: 'Custom tech accessories and 3D printed items',
    requestCount: 0,
    image: categoryGlassware,
  },
  {
    id: '8',
    name: 'Leather Goods',
    slug: 'leather-goods',
    icon: '👜',
    description: 'Wallets, bags, belts, and leather accessories',
    requestCount: 0,
    image: categoryLeather,
  },
];

export const featuredMakers: User[] = [];

export const sampleRequests: Request[] = [];

export const sampleProposals: Proposal[] = [];
