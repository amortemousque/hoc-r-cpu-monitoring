import { call, put, takeLatest } from 'redux-saga/effects'
import * as Api from './api'
import { fetchCpuLoadSucceeded, fetchLoad, fetchCpuLoadFailed, calculateHeavyCpuLoad, addLoads, addLoad } from './cpuLoadSlice';

function* fetchLoadAsync() {
    try {
        const load = yield call(Api.fetchLoad);
        yield put(fetchCpuLoadSucceeded(load));
        yield put(calculateHeavyCpuLoad());
    } catch (e) {
        yield put(fetchCpuLoadFailed);
    }
}

function* calculateHeavyCpu() {
    yield put(calculateHeavyCpuLoad());

}

export default function* watchAll() {
    yield takeLatest([fetchLoad], fetchLoadAsync)
    yield takeLatest([addLoads, addLoad], calculateHeavyCpu)
}