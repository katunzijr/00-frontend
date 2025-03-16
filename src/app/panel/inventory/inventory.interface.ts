export interface ProductInterface {
  id: number,
  bar_code: string,
  name: string,
  description: string,
  is_free: boolean,
  image: null | string,
  created_at: string,
  updated_at: string,
  business: number,
  branch: number,
  warehouse: number,
  store: number,
  category: number,
  subcategory: number,
  brand: number,
}

export interface AddProductInterface{
  name: string,
  description: string,
  business: number,
}
