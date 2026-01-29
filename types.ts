
export enum PropertyType {
  FLAT = 'Flat',
  VILLA = 'Villa',
  COMMERCIAL = 'Commercial',
  PLOT = 'Plot'
}

export enum TransactionType {
  RENT = 'Rent',
  SALE = 'Sale',
  LEASE = 'Lease'
}

export enum PropertyStatus {
  AVAILABLE = 'Available',
  ON_HOLD = 'On Hold',
  RENTED = 'Rented',
  SOLD = 'Sold'
}

export enum FurnishingStatus {
  FULLY = 'Fully',
  SEMI = 'Semi',
  UNFURNISHED = 'Unfurnished',
  ANY = 'Any'
}

export enum LeadStage {
  NEW = 'New',
  CONTACTED = 'Contacted',
  SHARED = 'Shared',
  SITE_VISIT = 'Site Visit',
  NEGOTIATION = 'Negotiation',
  CLOSED = 'Closed',
  LOST = 'Lost'
}

export interface Property {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number;
  negotiable: boolean;
  carpetArea: number;
  builtUpArea: number;
  bhk: string; // 1RK, 1BHK, etc.
  floorNumber: number;
  totalFloors: number;
  buildingName: string;
  facing: 'East' | 'West' | 'North' | 'South' | 'Other';
  ageOfBuilding: number;
  furnishing: FurnishingStatus;
  parking: boolean;
  liftAvailable: boolean;
  powerBackup: boolean;
  petsAllowed: boolean;
  bachelorsAllowed: boolean;
  availabilityDate: string;
  status: PropertyStatus;
  photos: string[];
  location: {
    address: string;
    area: string;
    city: string;
  };
  createdAt: string;
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  description: string; // Added description
  profession?: string;
  maritalStatus: 'Married' | 'Bachelor';
  familySize: number;
  requirement: TransactionType;
  preferredAreas: string[];
  preferredCity: string; // Added city explicitly
  bhkPreference: string[];
  furnishingPreference: FurnishingStatus[];
  budgetMin: number;
  budgetMax: number;
  moveInDate: string;
  leadStage: LeadStage;
  tags: string[];
  createdAt: string;
}

export interface MatchResult {
  propertyId: string;
  clientId: string;
  score: number;
  breakdown: {
    budget: number;
    area: number;
    bhk: number;
    furnishing: number;
    lifestyle: number;
    availability: number;
  };
  reasons: string[];
}
