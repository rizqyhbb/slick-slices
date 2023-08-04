import React, { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({ ...values, [e.target.name]: value });
  };

  return { values, onChange };
};

export default useForm;
