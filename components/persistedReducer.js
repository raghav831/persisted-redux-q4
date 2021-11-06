import React,{useState} from 'react';
import { createStore } from 'redux';
import createPersistedReducer from 'use-persisted-reducer';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

const usePersistedReducer = createPersistedReducer('state');

const initialState = { isSessionActive: true };

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isSessionActive: !state.isSessionActive };
    default:
      return { isSessionActive: !state.isSessionActive };
      // throw new Error();
  }
}

function Session() {
  const [state, dispatch] = usePersistedReducer(reducer, initialState);
  return (
    <>
      User Login:{state.isSessionActive?'Active':'Not Active'}
      {console.log(state)}
      <button onClick={() => dispatch({ type: 'toggle' })}>Toggle</button>
    </>
  );
}
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'],
// };

// const persistedReducer = persistReducer(persistConfig, reducer);
// const store = createStore(persistedReducer);

// const persistor = persistStore(store);
export {Session};
