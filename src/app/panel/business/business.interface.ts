export interface ObjectInterface<T> {
  count: number,
  next: string,
  previous: string,
  results: T[],
}

export interface BusinessInterface {
  id: number,
  name: string,
  description: string,
  website: string,
  is_bness_active: boolean,
  logo: null | string,
  social_media_links: string,
  established_date: string,
  created_at: string,
  updated_at: string,
  owner: number,
  type: number,
}

export interface LocalBusinessesInterface {
  id: number,
  name: string,
}

export interface BusinessTypeInterface {
  id: number,
  industry: string,
  name: string,
}

export interface AddBusinessInterface{
  name: string,
  description: string,
  website: string,
  is_bness_active: boolean,
  logo: File | null,
  social_media_links: string,
  owner: number | null,
  type: number
}

