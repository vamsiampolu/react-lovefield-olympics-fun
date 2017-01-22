import React from 'react'
import { Dropdown } from 'semantic-ui-react'
export const schema = {
  title: 'Olympic Medal Search',
  description: 'Search for olympic medal winners by year, hosting city, country, event and more',
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
    },
    discipline: {
      type: 'string',
      title: 'Discipline',
      enum: [
        'Athletics',
        'Archery',
        'Artistic G.',
        'BMX',
        'Badminton'
      ]
    },
    event: {
      type: 'string',
      title: 'Event',
      enum: [
        '+100 kg (Heavyweight)',
        '+ 100 kg (Superheavyweight)',
        '+ 105 kg',
        '+ 108kg, total (Superheavyweight)'
      ]
    },
    country: {
      type: 'string',
      title: 'Country',
      enum: [
        'AFG',
        'ALG',
        'AHO',
        'ANZ',
        'ARG'
      ]
    },
    color: {
      type: 'string',
      title: 'Color',
      enum: [
        'Gold',
        'Silver',
        'Bronze'
      ]
    },
    gender: {
      type: 'string',
      title: 'Gender',
      enum: [
        'Men',
        'Women'
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
