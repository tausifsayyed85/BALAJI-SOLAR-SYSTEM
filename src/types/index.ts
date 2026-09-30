export type Language = 'en' | 'hi' | 'mr';

export interface BusinessSettings {
  business_name: string;
  tagline_en: string;
  tagline_hi: string;
  tagline_mr: string;
  owner_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  approved_address_variant: '101' | '201';
  address_101: string;
  address_201: string;
  gst: string;
  instagram: string;
  youtube: string;
  google_maps_url: string;
  service_areas: string[];
  experience_years: string;
}

export interface SolarPackage {
  id: string;
  capacity_kw: number;
  phase: string;
  panel_count: number;
  panel_wattage: number;
  total_wp: number;
  panel_technology: string;
  panel_brand_ref: string;
  inverter_model: string;
  inverter_capacity: string;
  system_price: number;
  subsidy_reference: number;
  quotation_validity_days: number;
  warranty_pv_performance: string;
  warranty_inverter: string;
  amc_included_years: number;
  ac_dc_db: string;
  earthing_details: string;
  lightning_arrester: string;
  cables_fittings: string;
  net_meter_support: string;
  suitable_for: string;
  active: boolean;
}

export interface SolarProduct {
  id: string;
  title_en: string;
  title_hi: string;
  title_mr: string;
  category: string;
  description_en: string;
  description_hi: string;
  description_mr: string;
  specs: { label_en: string; label_hi: string; label_mr: string; value: string }[];
  brand_ref: string;
  warranty: string;
  image_url: string;
  is_illustrative: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  property_type: 'Residential' | 'Commercial' | 'Industrial';
  monthly_bill: number;
  monthly_units: number;
  preferred_capacity?: string;
  message?: string;
  source: string;
  created_at: string;
  status: 'New' | 'Contacted' | 'Site Visited' | 'Quoted' | 'Closed';
}

export interface FAQItem {
  id: string;
  category: 'general' | 'technical' | 'financial' | 'maintenance';
  q_en: string;
  q_hi: string;
  q_mr: string;
  a_en: string;
  a_hi: string;
  a_mr: string;
}

export interface SolarArticle {
  id: string;
  title_en: string;
  title_hi: string;
  title_mr: string;
  summary_en: string;
  summary_hi: string;
  summary_mr: string;
  content_en: string[];
  content_hi: string[];
  content_mr: string[];
  read_time: string;
  category: string;
}

export interface ProjectItem {
  id: string;
  title_en: string;
  title_hi: string;
  title_mr: string;
  category: 'Residential' | 'Commercial' | 'Rooftop' | 'Installation';
  location: string;
  capacity: string;
  panels_used: string;
  system_type: string;
  image_url: string;
  is_real: boolean;
}
