import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import cpuLoadReducer from './cpuLoadSlice'
import watchAll from './saga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    cpuLoads: cpuLoadReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
})

sagaMiddleware.run(watchAll)

export default store