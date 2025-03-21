/**
 * Interface básica para conexão de banco de dados
 */
export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}
