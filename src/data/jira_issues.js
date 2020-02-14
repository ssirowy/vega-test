import Papa from 'papaparse'

const weatherString = ``


export const data = {
    values: Papa.parse(weatherString, { header: true, dynamicTyping: true }).data
}

export const schema = {
    fields: [
        {
            name: "date",
            type: "date"
        },
        {
            name: "precipitation",
            type: "number"
        },
        {
            name: "temp_max",
            type: "number"
        },
        {
            name: "temp_min",
            type: "number"
        },
        {
            name: "wind",
            type: "number"
        },
        {
            name: "weather",
            type: "string"
        },
    ]
}