import type { Entity } from './IBaseEntity';

export interface Repository<T extends Entity> {
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
}
