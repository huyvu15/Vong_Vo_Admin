

export interface IProduct {
  _id: string;
  sku: string;
  title: string;
  parent: string;
  children: string;
  tags: string[];
  image: string;
  originalPrice: number;
  price: number;
  discount?: number;
  relatedImages: string[];
  description: string;
  orderQuantity:number;
  brand: {
    name:string;
    id:string;
  };
  category: {
    name:string;
    id:string;
  };
  unit: string;
  quantity: number;
  colors: string[];
  type?: string;
  itemInfo?: string;
  status: string;
}

export interface IDashboardLowProduct {
  lowStockProduct: IProduct[];
}

export interface ProductResponse {
  success: boolean;
  data: IProduct[];
}

// IAddProduct
export interface IAddProduct {
  sku: string;
  title: string;
  parent: string;
  children: string;
  tags: string[];
  image: string;
  originalPrice: number;
  price: number;
  discount?: number;
  relatedImages: string[];
  description: string;
  brand: {
    name:string;
    id:string;
  };
  category: {
    name:string;
    id:string;
  };
  unit: string;
  quantity: number;
  colors: string[];
  type?: string;
  itemInfo?: string;
  status?: string;
}
