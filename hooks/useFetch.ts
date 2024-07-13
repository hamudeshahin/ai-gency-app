import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

type UseFetchProps = {
  callApiFunc: (props: any) => Promise<any>;
  callOnMount?: boolean;
};

const useFetch = (props: UseFetchProps) => {
  // extract props
  const { callApiFunc, callOnMount = false } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // get fetch function and call it here
  const fetchData = async (props: any) => {
    setIsLoading(true);
    try {
      const response = await callApiFunc(props);
      setData(response);
    } catch (error) {
      setError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (callOnMount) {
        fetchData({});
      }
      return () => {};
    }, [callOnMount, callApiFunc])
  );

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;
