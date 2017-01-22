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
      const options = [
        {
          text: '1896',
          value: 1896
        },
        {
          text: '1900',
          value: 1900
        },
        {
          text: '1904',
          value: 1904
        },
        {
          text: '1908',
          value: 1908
        }
      ]
      return (<Dropdown selection options={options} />)
    }
  }
}
