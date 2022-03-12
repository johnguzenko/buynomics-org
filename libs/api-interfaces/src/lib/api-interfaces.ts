export interface IntermediaryDto {
  id: number;
  name: string;
  order: number;
  type: 'Range' | 'Dropdown'; //TODO enum
  createdAt: string;
  typeInfo: unknown; //TODO return complex type
}
