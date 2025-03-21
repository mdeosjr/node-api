import type { DatabaseConnection } from './connection';

class Database {
  private static instance: Database;
  private db: DatabaseConnection | null = null;

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<void> {
    this.db = {
      connect: async () => {
        throw new Error('Conexão com o banco de dados falhou');
      },
      disconnect: async () => {},
      isConnected: (): boolean => {
        return false;
      },
    };
    await this.db.connect();
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      await this.db.disconnect();
      this.db = null;
    }
  }

  getDatabase(): DatabaseConnection {
    if (!this.db) {
      throw new Error('Banco de dados não inicializado');
    }
    return this.db;
  }
}

export const database = Database.getInstance();
export * from './connection';
