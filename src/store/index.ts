import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/reducer'
import form from './form/reducer'
import verification from './verification/reducer'
import type { TypedUseSelectorHook } from 'react-redux'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { api } from './api'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// Persist configuration
const persistConfig = (key:string) => ({
	key,
	storage,
})


const initStore = () =>
	configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			auth: persistReducer(persistConfig('auth'), auth),
			form: persistReducer(persistConfig('form'), form),
			verification: persistReducer(persistConfig('verification'), verification),
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(api.middleware),
	})

const store = initStore()

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useShallowEqualSelector = <T>(selector: (state: RootState) => T, shallow = shallowEqual): T => {
	return useTypedSelector(selector, shallow)
}

export { store, persistor }
