import { AppError, STATUS_CODE } from '../errors/AppError';
import type { Entity } from '../types/IBaseEntity';
import type { Repository } from '../types/IRepository';

export abstract class BaseService<T extends Entity> {
  protected abstract entityName: string;

  constructor(protected repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw this.handleError(error, 'Error fetching all records');
    }
  }

  async findById(id: string | number): Promise<T> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new AppError(`${this.entityName} not found`, STATUS_CODE.NOT_FOUND);
      }
      return entity;
    } catch (error) {
      throw this.handleError(error, `Error fetching ${this.entityName}`);
    }
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw this.handleError(error, `Error creating ${this.entityName}`);
    }
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    try {
      const updated = await this.repository.update(id, data);
      if (!updated) {
        throw new AppError(`${this.entityName} not found`, STATUS_CODE.NOT_FOUND);
      }
      return updated;
    } catch (error) {
      throw this.handleError(error, `Error updating ${this.entityName}`);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        throw new AppError(`${this.entityName} not found`, STATUS_CODE.NOT_FOUND);
      }
    } catch (error) {
      throw this.handleError(error, `Error deleting ${this.entityName}`);
    }
  }

  protected handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message || defaultMessage, STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return new AppError(defaultMessage, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}
