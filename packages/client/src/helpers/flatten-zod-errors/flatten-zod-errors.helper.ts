import { createWorkoutSchema } from '../../common/types/types';

type ZodFormattedError = ReturnType<
  ReturnType<typeof createWorkoutSchema>['safeParse']
>['error']['format'];

export const flattenZodErrors = (
  errorObject: ZodFormattedError,
  path: (string | number)[] = [],
  setError: (name: string, error: { type: string; message: string }) => void,
): void => {
  for (const key in errorObject) {
    if (key === '_errors') {
      const messages = errorObject._errors;
      if (messages && messages.length > 0) {
        const fieldName = path.join('.');
        setError(fieldName, { type: 'manual', message: messages[0] });
        console.log('Setting error:', fieldName, messages[0]);
      }
    } else {
      const child = errorObject[key];
      if (typeof child === 'object' && child !== null) {
        const isArrayIndex = !isNaN(Number(key));
        const nextPath = [...path, isArrayIndex ? Number(key) : key];
        flattenZodErrors(child as ZodFormattedError, nextPath, setError);
      }
    }
  }
};
