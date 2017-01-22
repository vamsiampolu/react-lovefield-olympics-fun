import React from 'react'
import { Dropdown } from 'semantic-ui-react'
export const schema = {
  title: 'Olympic Medal Search',
  type: 'object',
  properties: {
    fromYear: {
      type: 'number',
      title: 'From Year',
      enum: [
        1896,
        1900,
        1904,
        1908
      ]
    },
    toYear: {
      type: 'number',
      title: 'To Year',
      enum: [
        1896,
        1900,
        1904,
        1908
      ]
    },
    hostingCity: {
      type: 'string',
      title: 'Hosting City',
      enum: [
        'Athens',
        'Antwerp',
        'Amsterdam'
      ]
    }
  }
}

export const uiSchema = {
  fromYear: {
    'ui:widget': props => {
      console.log(props)
      const { label, schema } = props
      const options = schema.enum.map(item => ({ text: `${item}`, value: item }))
     return (<Dropdown selection text={label} options={options} />)
    }
  }
}
