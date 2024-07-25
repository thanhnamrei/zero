export interface Product {
  id: number;
  name: string;
  description: string;
  brandId: number;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  variants: Variant[];
  // brand: Brand;
  categories: Category[];
}

export class ProductViewModel {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  variantCount: number;
  categories: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = Math.max(...product.variants.map((x) => x.price));
    this.stock = Math.min(...product.variants.map((x) => x.stock));
    this.createdAt =
      typeof product.createdAt === 'string'
        ? new Date(product.createdAt)
        : product.createdAt;
    this.updatedAt =
      typeof product.updatedAt === 'string'
        ? new Date(product.updatedAt)
        : product.updatedAt;
    this.variantCount = product.variants.length;
    this.categories = product.categories.map((c) => c.name).join(', ');
  }
}

export interface Variant {
  variantId: number;
  productId: number;
  sku: string;
  price: number;
  stock: number;
  color: string;
  size: string;
  material: string;
  createdAt: string;
  updatedAt: any;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
}
