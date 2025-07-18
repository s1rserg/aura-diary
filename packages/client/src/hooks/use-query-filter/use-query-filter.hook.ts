import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseQueryFilterParams<T> = {
  queryParameterName: string;
  defaultValue: T;
  isSavedToUrl?: boolean;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

function useQueryFilter<T>({
  queryParameterName,
  defaultValue,
  isSavedToUrl = true,
  serialize = (v) => String(v),
  deserialize = (v) => v as unknown as T,
}: UseQueryFilterParams<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get(queryParameterName);

  const [value, setValue] = useState<T>(
    isSavedToUrl && initial !== null ? deserialize(initial) : defaultValue,
  );

  useEffect(() => {
    if (!isSavedToUrl) return;

    const params = new URLSearchParams(searchParams);
    const serialized = serialize(value);

    if (serialized) {
      params.set(queryParameterName, serialized);
    } else {
      params.delete(queryParameterName);
    }

    setSearchParams(params);
  }, [value, isSavedToUrl, queryParameterName, searchParams, setSearchParams]);

  return { value, setValue };
}

export { useQueryFilter };
