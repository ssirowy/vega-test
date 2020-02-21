export const dataSetForName = (dataSets, name) =>
  dataSets.find(set => set.label === name);

let counter = 1;

export const dataSetFromString = str => {
  const json = JSON.parse(str);

  return {
    data: {
      values: json.values
    },
    label: `Imported data set ${counter++}`,
    schema: {
      fields: sanitizedFields(json.fields)
    }
  };
};

const sanitizedType = type => {
  switch (type) {
    case "number":
    case "average":
    case "count_distinct":
    case "percent_of_total":
    case "zipcode":
      return "number";

    case "string":
    case "date_quarter":
    case "date_month":
    case "date_week":
    case "date_year":
    case "date_time":
    case "tier":
      return "string";

    case "date_date":
      return "date";

    default:
      console.error(type);
      return "Unknown";
  }
};

const sanitizedField = ({ name, type }) => ({
  name,
  type: sanitizedType(type)
});

const sanitizedFields = fields => fields.map(sanitizedField);
