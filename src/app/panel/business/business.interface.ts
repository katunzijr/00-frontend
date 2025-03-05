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

export interface LocalBusinessInterface {
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
  // logo: File | null,
  social_media_links: string,
  owner: number | null,
  type: number,
  location: string
}

export interface AddBranchInterface{
  tag: string,
  contact_email: string,
  contact_line1: string,
  contact_line2: string,
  fax: string,
  city: string,
  country: string,
  state_province: string,
  zip_postal_code: string,
  location: string,
  is_branch_active: boolean,
  business: number | undefined
}

export interface BranchInterface{
  id: number,
  tag: string,
  contact_email: string,
  contact_line1: string,
  contact_line2: string,
  fax: string,
  city: string,
  country: string,
  state_province: string,
  zip_postal_code: string,
  location: string,
  is_branch_active: boolean,
  business: number
  created_at: string,
  updated_at: string,
}
