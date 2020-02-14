import { typeForField } from './type_for_field'
/**
 * Generate options objects to be used by React Select for selecting things
 */

export const fieldOptionsForSchema = schema =>
  schema.fields.map(field => ({
    value: field.name,
    label: field.name
  }));

export const dataSetsOptionsFromDataSets = dataSets => dataSets.map(dataSet => ({
    value: dataSet.label,
    label: dataSet.label
}))

export const typeOptionsForField = (schema, fieldName) => {
  const field = typeForField(schema, fieldName);
  return field ? availableTypeOptions[field.type] : null;
};

export const aggregateOptionsForField = (schema, fieldName) => {
  const field = typeForField(schema, fieldName);
  return field ? availableAggregateOptions[field.type] : null;
};

// Represents a set of options for different mark types
export const markOptions = [
    { value: "point", label: "Points" },
    { value: "circle", label: "Circles" },
    { value: "tick", label: "Ticks" },
    { value: "line", label: "Line" },
    { value: "bar", label: "Bar" },
    { value: "area", label: "Area" },
    { value: "boxplot", label: "Box plot" }
  ];
  
  // For a given column value, provides list of options to treat type 
  export const availableTypeOptions = {
    string: [
      { value: "nominal", label: "Nominal" },
      { value: "ordinal", label: "Ordinal" }
    ],
    number: [
      { value: "quantitative", label: "Quantitative" },
      { value: "ordinal", label: "Ordinal" }
    ],
    date: [{ value: "temporal", label: "Date" }]
  };
    
  // Available time grouping options
  export const availableTimeUnits = [
    { value: null, label: "Date" },
    { value: "date", label: "Date number" },
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" }
  ];
  
  // Ways to aggregate baed on columb schema type
  export const availableAggregateOptions = {
    string: [
      { value: null, label: "None" },
      { value: "count", label: "Count" }
    ],
    number: [
      { value: null, label: "None" },
      { value: "count", label: "Count" },
      { value: "sum", label: "Sum" },
      { value: "average", label: "Average" },
      { value: "max", label: "Max" },
      { value: "min", label: "Min" }
    ]
  };
  