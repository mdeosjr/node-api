import { AppError, STATUS_CODE } from '../errors/AppError';
import type { Repository } from '../types/IRepository';
import type { Entity } from '../types/IBaseEntity';

export abstract class BaseRepository<T extends Entity> implements Repository<T> {
  protected abstract entityName: string;

  abstract findAll(): Promise<T[]>;
  abstract findById(id: string | number): Promise<T | null>;
  abstract create(data: Omit<T, 'id'>): Promise<T>;
  abstract update(id: string | number, data: Partial<T>): Promise<T | null>;
  abstract delete(id: string | number): Promise<boolean>;

  protected async ensureExists(id: string | number): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new AppError(`${this.entityName} not found`, STATUS_CODE.NOT_FOUND);
    }
    return entity;
  }
}
