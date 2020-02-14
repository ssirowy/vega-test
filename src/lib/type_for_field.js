export const typeForField = (schema, fieldName) =>
  schema.fields.find(field => field.name === fieldName);
