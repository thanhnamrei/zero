export interface Product {
    id: number
    name: string
    description: any
    brandId: number
    createdAt: string
    updatedAt: any
    variants: Variant[]
    brand: Brand
  }
  
  export interface Variant {
    variantId: number
    productId: number
    sku: string
    price: number
    stock: number
    color: string
    size: string
    material: string
    createdAt: string
    updatedAt: any
    product: any
  }
  
  export interface Brand {
    id: number
    name: string
    description: string
  }
  