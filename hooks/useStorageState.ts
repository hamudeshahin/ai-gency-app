// basic hook that persists tokens securely on native with expo-secure-store and in local storage on web.

import * as SecureStore from "expo-secure-store";
import * as React from "react";

// type for the useState hook
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// custom hook that returns a state and a setState function that persists the state in secure storage
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

// function to set a value in secure storage
export async function setStorageItemAsync(key: string, value: string | null) {
  if (value === null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

// custom hook that returns a state and a setState function that persists the state in secure storage
export function useStorageState(key: string): UseStateHook<string> {
  // use the custom hook to get the state and setState function
  const [state, setState] = useAsyncState<string>([true, null]);

  // get the value from secure storage and set the state
  React.useEffect(() => {
    SecureStore.getItemAsync(key)
      .then((value) => {
        setState(value);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [key]);

  // function to set the value in secure storage and update the state
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  // return the state and the setState function
  return [state, setValue];
}
