import { QueryRunner } from 'typeorm';

const CONTEXT_KEY = `_TRANSACTION_RUNNER`; //TODO make configurable

export const getRunnerFromContext = (context: any): QueryRunner => {
  return context[CONTEXT_KEY];
};

export const setRunnerInContext = (
  context: any,
  runner?: QueryRunner
): void => {
  context[CONTEXT_KEY] = runner;
};
