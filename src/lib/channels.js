// Build a positional encoding channel
export const positionChannel = c => {
  if (!c.field) return null;

  const e = channel(c);

  if (c.aggregateOption && c.aggregateOption.value) {
    e.aggregate = c.aggregateOption.value;
  }

  if (c.timeUnitOption && c.timeUnitOption.value) {
    e.timeUnit = c.timeUnitOption.value;
  }

  return e;
};

export const channel = c => c.field ? ({
  field:  c.field && c.field.value,
  type: c.type && c.type.value,
  bin: c.bin
}) : null