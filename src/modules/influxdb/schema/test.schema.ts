import { FieldType } from 'influx'

export default ({
  measurement: 'test',
  fields: {
    value: FieldType.INTEGER,
  },
  tags: ['mac'],
})
