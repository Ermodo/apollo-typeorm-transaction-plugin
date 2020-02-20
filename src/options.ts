import { Connection } from 'typeorm';

export class Options {
    public connection!: Readonly<Connection>
    public enableStuckControl = false;
    public transactionTimeout = 60000;
    // public contextKey = '_TRANSACTION_STUCK_CONTROL_TIMEOUT';
    //public stuckControlKey = ''
}