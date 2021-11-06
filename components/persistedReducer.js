import React from 'react';
import createPersistedReducer from './index';

const usePersistedReducer = createPersistedReducer('state');

const initialState = { isSessionActive: true };

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isSessionActive: !state.isSessionActive };
    default:
      throw new Error();
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

export default Session;
