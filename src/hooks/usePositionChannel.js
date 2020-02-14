import { useState } from "react";
import { useChannel } from "./useChannel";
import { aggregateOptionsForField, availableTimeUnits, typeOptionsForField} from '../lib'

export const usePositionChannel = (schema) => {
  const [baseChannel, setBaseChannel, baseClear] = useChannel(schema);

  const [aggregateOptions, setAggregateOptions] = useState();
  const [aggregateOption, setAggregateOption] = useState();
  const [timeUnitOption, setTimeUnitOption] = useState();

  const { field: setField,  ...restSetBaseChannel } = setBaseChannel

  const handleFieldChange = option => {

    setField(option);

    if (option) {
      const newTypeOptions = typeOptionsForField(schema, option.value);
      setBaseChannel.typeOptions(newTypeOptions);
      setBaseChannel.type(newTypeOptions[0]);

      const newAggregateOptions = aggregateOptionsForField(
        schema,
        option.value
      );

      setAggregateOptions(newAggregateOptions);
      setAggregateOption(newAggregateOptions && newAggregateOptions[0]);

      setTimeUnitOption(availableTimeUnits[0]);
    }
  };

  return [
      {
          ...baseChannel,
          aggregateOptions,
          aggregateOption,
          timeUnitOption
      },
      {
          field: handleFieldChange,
          ...restSetBaseChannel,
          aggregateOptions: setAggregateOptions,
          aggregateOption: setAggregateOption,
          timeUnitOption: setTimeUnitOption
      }
  ]
};
