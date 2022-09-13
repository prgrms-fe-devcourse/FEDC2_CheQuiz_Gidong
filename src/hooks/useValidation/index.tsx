/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';

const useValidation = (schema: any, formValues: any) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const handleFormSubmit = (event: React.FormEvent, successCallback: any) => {
    event.preventDefault();

    if (!isValidating) setIsValidating(true);

    schema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        successCallback(formValues);
      })
      .catch((err: any) => {
        if (err.name === 'ValidationError') {
          const flatErr = err.inner.flatMap((e: any) => ({
            [e.path]: e.errors,
          }));
          const errs = flatErr.reduce(
            (acc: any, cur: any) => ({ ...acc, ...cur }),
            {}
          );
          setErrors(errs);
        }
      });
  };

  const reValidate = () => {
    if (!isValidating) return;

    try {
      schema.validateSync(formValues, { abortEarly: false });
      setErrors({});
      // eslint-disable-next-line consistent-return
      return true;
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const flatErr = err.inner.flatMap((e: any) => ({
          [e.path]: e.errors,
        }));
        const errs = flatErr.reduce(
          (acc: any, cur: any) => ({ ...acc, ...cur }),
          {}
        );
        setErrors(errs);
      }
    }
  };

  const resetValidation = () => {
    setIsValidating(false);
    setErrors({});
  };

  return {
    errors,
    reValidate,
    handleFormSubmit,
    resetValidation,
  };
};

export default useValidation;
