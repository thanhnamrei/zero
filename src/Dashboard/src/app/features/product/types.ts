export interface IProduct {
  id: number;
  name: string;
  description: string;
  brandId: number;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
  brand: Brand;
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
