import { ApolloServerPlugin } from 'apollo-server-plugin-base';//TODO peer dependency
import { Connection } from 'typeorm';

import { getRunnerFromContext, setRunnerInContext } from './transaction.helper';
import { Options } from './options';

const STUCK_CONTROL_CONTEXT_KEY = '_TRANSACTION_STUCK_CONTROL_TIMEOUT';

const cleanUpConnection = async context => {
  const runner = getRunnerFromContext(context);
  setRunnerInContext(context, null);
  await runner.release();
  clearTimeout(context[STUCK_CONTROL_CONTEXT_KEY]);
};

export class TransactionPlugin implements ApolloServerPlugin {

  private readonly options: Options;

  constructor(options: Partial<Options>) {
    this.options = Object.assign(new Options(), options);
  }

  private async startTransaction(context: any) {
    const runner = this.options.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    setRunnerInContext(context, runner);

    if (this.options.enableStuckControl) {
      context[STUCK_CONTROL_CONTEXT_KEY] = setTimeout(() => {
        console.error('Transaction appears to be stuck, aborting..');
        this.abortTransaction(context);
        //The remaining Request is left to crash
      }, this.options.transactionTimeout);
    }
  }

  private async abortTransaction(context: any) {
    const runner = getRunnerFromContext(context);
    if (runner) {
      await runner.rollbackTransaction();
      await cleanUpConnection(context);
    }
  }

  private async commitTransaction(context: any) {
    const runner = getRunnerFromContext(context);
    if (runner) {
      await runner.commitTransaction();
      await cleanUpConnection(context);
    }
  }

  public requestDidStart() {
    return {
      didResolveOperation: async ({ context }) => {
        await this.startTransaction(context);
      },
      didEncounterErrors: async ({ context }) => {
        await this.abortTransaction(context);
      },
      willSendResponse: async ({ context }) => {
        await this.commitTransaction(context);
      },
    };
  }
}
