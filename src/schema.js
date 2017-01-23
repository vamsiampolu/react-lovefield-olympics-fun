import React from 'react'
import { Form, Message, Header } from 'semantic-ui-react'
import ObjectField from './components/ObjectField'
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
  return (<Form.Select options={suiOptions} placeholder={label} />)
}

const DescriptionField = ({ id, description }) => {
  if (description != null) {
    return (<Message content={description} />)
  }
  return null
}

const TitleField = ({ id, required, title }) => {
  const size = id !== 'root__title' ? 'medium' : 'large'
  return (<Header size={size}>{title}</Header>)
}

export const FieldTemplate = props => {
  const { id, label, help, required, description, errors, children } = props
  console.log(id)
  const desc = id !== 'root' ? description : null
  const labelComp = id !== 'root' ? <label>{label}</label> : null
  const classNames = `${required ? 'required ' : ''}field`
  return (<div className={classNames}>
    {labelComp}
    {desc}
    {children}
    {errors}
    {help}
  </div>)
}

export const fields = {
  DescriptionField: DescriptionField,
  TitleField: TitleField,
  ObjectField: ObjectField
}

export const widgets = { 'select': Select }
