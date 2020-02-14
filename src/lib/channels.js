// Build a positional encoding channel
export const positionChannel = c => {
  if (!c.field) return null;

  const e = channel(c);

  debugger
  if (c.aggregateOption && c.aggregateOption.value) {
    e.aggregate = c.aggregateOption.value;
  }

  if (c.timeUnitOption && c.timeUnitOption.value) {
    e.timeUnit = c.imeUnitOption.value;
  }

  return e;
};

export const channel = c => ({
  field:  c.field && c.field.value,
  type: c.type && c.type.value
});