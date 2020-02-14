import { useState } from 'react'
import { typeOptionsForField } from '../lib'

export const useChannel = (schema) => {
  const [field, setField] = useState();
  const [typeOptions, setTypeOptions] = useState();
  const [type, setType] = useState();

  const handleFieldChange = option => {
    setField(option);

    if (option) {
      const newTypeOptions = typeOptionsForField(schema, option.value);
      setTypeOptions(newTypeOptions);
      setType(newTypeOptions[0]);
    }
  };  

  const clear = () => {
    setField()
    setTypeOptions()
    setType()
  }

  return [
    {
      field,
      typeOptions,
      type
    },
    {
      field: handleFieldChange,
      typeOptions: setTypeOptions,
      type: setType
    },
    clear
  ]; 
};