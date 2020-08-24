import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchImages } from '../../api';
import { unsplashAction } from './slice';

function* handleImageLoad() {
  const { loadSuccess, loadFail } = unsplashAction;
  try {
    const images = yield call(fetchImages);
    yield put(loadSuccess(images));
  } catch (err) {
    yield put(loadFail(err));
  }
}
export function* watchUnsplash() {
  const { load } = unsplashAction;
  yield takeLatest(load, handleImageLoad);
}
