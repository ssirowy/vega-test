import { useState } from 'react'
import { typeOptionsForField } from '../lib'

export const useChannel = (schema) => {
  const [field, setField] = useState();
  const [bin, setBin] = useState(false)
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
    setField(null)
    setTypeOptions(null)
    setType(null)
  }

  const all = (channel) => {
    setField(channel.field)
    setTypeOptions(channel.typeOptions)
    setType(channel.type)
  }

  return [
    {
      field,
      typeOptions,
      type,
      bin
    },
    {
      field: handleFieldChange,
      typeOptions: setTypeOptions,
      type: setType,
      bin: setBin,
      all
    },
    clear
  ]; 
};