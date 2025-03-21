import type { Context } from 'koa';
import { AppError, STATUS_CODE } from '../errors/AppError';
import type { Entity } from '../types/IBaseEntity';
import type { BaseService } from '../services/BaseService';

export abstract class BaseController<T extends Entity> {
  constructor(protected service: BaseService<T>) {}

  getAll = async (ctx: Context): Promise<void> => {
    ctx.body = await this.service.findAll();
    ctx.status = STATUS_CODE.OK;
  };

  getById = async (ctx: Context): Promise<void> => {
    const id = this.extractId(ctx);
    ctx.body = await this.service.findById(id);
    ctx.status = STATUS_CODE.OK;
  };

  create = async (ctx: Context): Promise<void> => {
    if (!ctx.request.body) {
      throw new AppError('Request body is missing', STATUS_CODE.BAD_REQUEST);
    }

    const entity = await this.service.create(ctx.request.body as Omit<T, 'id'>);
    ctx.status = STATUS_CODE.CREATED;
    ctx.body = entity;
  };

  update = async (ctx: Context): Promise<void> => {
    const id = this.extractId(ctx);

    if (!ctx.request.body) {
      throw new AppError('Request body is missing', STATUS_CODE.BAD_REQUEST);
    }

    ctx.body = await this.service.update(id, ctx.request.body as Partial<T>);
    ctx.status = STATUS_CODE.OK;
  };

  delete = async (ctx: Context): Promise<void> => {
    const id = this.extractId(ctx);
    await this.service.delete(id);
    ctx.status = STATUS_CODE.NO_CONTENT;
  };

  protected extractId(ctx: Context): string | number {
    const id = ctx.params.id;

    if (!id) {
      throw new AppError('ID parameter is required', STATUS_CODE.BAD_REQUEST);
    }

    return id;
  }
}
