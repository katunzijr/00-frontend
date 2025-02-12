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

export interface ObjectInterface {
  count: number,
  next: string,
  previous: string,
  results: BusinessInterface[],
}

export interface LocalBusinessesInterface {
  id: number,
  name: string,
}



