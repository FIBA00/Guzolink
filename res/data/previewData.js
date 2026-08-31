/** Style: Market Ledger — development-only sample inventory proves layouts without claiming live marketplace data. */
export const previewUser = {
  id: "admin-demo",
  name: "Mekdes Bekele",
  email: "admin@guzolink.local",
  role: "admin",
  shopName: "Guzo Studio",
};
export const categories = [
  { id: "home", label: "Home & living", icon: "LampDesk" },
  { id: "style", label: "Style", icon: "Shirt" },
  { id: "food", label: "Food & pantry", icon: "CookingPot" },
  { id: "craft", label: "Craft", icon: "Palette" },
  { id: "wellbeing", label: "Wellbeing", icon: "Sparkles" },
];
export const previewProducts = [
  {
    id: "p-101",
    name: "Amber coffee cups",
    price: 780,
    currency: "ETB",
    category: "home",
    stock: 12,
    shop: "Guzo Studio",
    shopSlug: "guzo-studio",
    description:
      "A quietly weighty pair of wheel-thrown cups, glazed in a warm amber finish for everyday coffee rituals.",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85",
    featured: true,
    createdAt: "2026-08-24",
  },
  {
    id: "p-102",
    name: "Indigo carryall",
    price: 1450,
    currency: "ETB",
    category: "style",
    stock: 8,
    shop: "Tibeb Carry",
    shopSlug: "tibeb-carry",
    description:
      "A durable everyday carryall in hand-finished indigo cotton with a structured base and a soft interior pocket.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    featured: true,
    createdAt: "2026-08-22",
  },
  {
    id: "p-103",
    name: "Berbere pantry set",
    price: 420,
    currency: "ETB",
    category: "food",
    stock: 24,
    shop: "Emnet Pantry",
    shopSlug: "emnet-pantry",
    description:
      "A fragrant kitchen trio of house-ground spice blends packed in refillable glass jars.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85",
    featured: false,
    createdAt: "2026-08-19",
  },
  {
    id: "p-104",
    name: "Weave wall basket",
    price: 930,
    currency: "ETB",
    category: "craft",
    stock: 4,
    shop: "Mebrat Home",
    shopSlug: "mebrat-home",
    description:
      "A handwoven wall basket that doubles as a shallow tray for letters, produce, or small everyday objects.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
    featured: true,
    createdAt: "2026-08-16",
  },
  {
    id: "p-105",
    name: "Moringa body oil",
    price: 360,
    currency: "ETB",
    category: "wellbeing",
    stock: 17,
    shop: "Adey Body",
    shopSlug: "adey-body",
    description:
      "A lightweight botanical body oil with a clean, herbaceous finish and simple reusable packaging.",
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=85",
    featured: false,
    createdAt: "2026-08-11",
  },
  {
    id: "p-106",
    name: "Teff grain bowl",
    price: 620,
    currency: "ETB",
    category: "home",
    stock: 0,
    shop: "Guzo Studio",
    shopSlug: "guzo-studio",
    description:
      "A low-profile handmade stoneware bowl designed for warm breakfasts and shared table spreads.",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85",
    featured: false,
    createdAt: "2026-08-08",
  },
];
export const previewShops = [
  {
    id: "s-1",
    slug: "guzo-studio",
    name: "Guzo Studio",
    category: "Home & living",
    location: "Addis Ababa",
    products: 18,
    description:
      "Small-batch tableware and objects made for the everyday home.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
    color: "#d68a21",
  },
  {
    id: "s-2",
    slug: "tibeb-carry",
    name: "Tibeb Carry",
    category: "Style",
    location: "Bahir Dar",
    products: 11,
    description: "Utility bags and easy textiles made to go further.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
    color: "#416344",
  },
  {
    id: "s-3",
    slug: "emnet-pantry",
    name: "Emnet Pantry",
    category: "Food & pantry",
    location: "Hawassa",
    products: 26,
    description:
      "Thoughtful pantry staples with a distinctly local point of view.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    color: "#b9634a",
  },
];
export const previewOrders = [
  {
    id: "GL-2048",
    customer: "Selam Tadesse",
    items: 3,
    total: 2340,
    paymentStatus: "Paid",
    orderStatus: "Packed",
    createdAt: "2026-08-26",
    product: "Amber coffee cups",
  },
  {
    id: "GL-2041",
    customer: "Samson Kassa",
    items: 1,
    total: 930,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    createdAt: "2026-08-24",
    product: "Weave wall basket",
  },
  {
    id: "GL-2039",
    customer: "Hana Getachew",
    items: 2,
    total: 1560,
    paymentStatus: "Pending",
    orderStatus: "New",
    createdAt: "2026-08-23",
    product: "Amber coffee cups",
  },
];
export const previewCustomers = [
  {
    id: "c-1",
    name: "Selam Tadesse",
    email: "selam@example.com",
    orders: 4,
    spent: 5620,
    lastOrder: "26 Aug 2026",
  },
  {
    id: "c-2",
    name: "Samson Kassa",
    email: "samson@example.com",
    orders: 2,
    spent: 2140,
    lastOrder: "24 Aug 2026",
  },
  {
    id: "c-3",
    name: "Hana Getachew",
    email: "hana@example.com",
    orders: 1,
    spent: 1560,
    lastOrder: "23 Aug 2026",
  },
];
