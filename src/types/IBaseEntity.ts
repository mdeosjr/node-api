export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEntityDTO<T extends Entity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEntityDTO<T extends Entity> = Partial<CreateEntityDTO<T>>;
