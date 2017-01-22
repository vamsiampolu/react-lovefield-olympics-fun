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

const Select = props => {
  console.log(props)
  const { label, options } = props
  const suiOptions = options.enumOptions.map(({ label, value }) => ({ text: label, value }))
  return (<Dropdown selection text={label} options={suiOptions} />)
}

export const uiSchema = {
  fromYear: {
    'ui:widget': 'select'
  }
}

export const widgets = { 'select': Select }
