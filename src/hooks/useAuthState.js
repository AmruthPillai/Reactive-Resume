import { useEffect, useReducer, useState } from 'react';

export default function useAuthState(firebase) {
  const [auth, setAuth] = useState(undefined);

  const [state, dispatch] = useReducer(
    (innerState, action) => {
      switch (action.type) {
        case 'auth_state_changed':
          return {
            ...innerState,
            user: action.user,
            loading: false,
          };
        case 'error':
          return {
            ...innerState,
            error: action.error,
            loading: false,
          };
        default:
          return innerState;
      }
    },
    {
      user: undefined,
      loading: true,
      error: undefined,
    },
  );

  useEffect(() => {
    setAuth(firebase.auth());
  }, [firebase]);

  useEffect(() => {
    if (auth === undefined) return;

    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        dispatch({ type: 'auth_state_changed', user });
      },
      (error) => {
        dispatch({ type: 'error', error });
      },
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return [state.user, state.loading, state.error];
}
