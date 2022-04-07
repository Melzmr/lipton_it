import { takeLatest, ForkEffect } from 'redux-saga/effects';

export function* rootSaga(): Generator<ForkEffect> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  yield takeLatest('saga', () => {});
}
