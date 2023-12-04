import { FieldType } from "influx";

export const testDataSchema = {
  measurement: 'test',
  fields: {
    value: FieldType.INTEGER,
  },
  tags: ['mac'],
}

