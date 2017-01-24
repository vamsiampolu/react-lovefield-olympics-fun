import React from 'react'
import { Form, Message, Header } from 'semantic-ui-react'
import ObjectField from './components/ObjectField'
import domains from './data/column_domains'

const { years, cities, countries, disciplines, events, colors, genders } = domains

export const schema = {
  title: 'Olympic Medal Search',
  description: 'Search for olympic medal winners by year, hosting city, country, event and more',
  type: 'object',
  properties: {
    fromYear: {
      type: 'number',
      title: 'From Year',
      enum: [ undefined, ...years ]
    },
    toYear: {
      type: 'number',
      title: 'To Year',
      enum: [ undefined, ...years ]
    },
    hostingCity: {
      type: 'string',
      title: 'Hosting City',
      enum: [ undefined, ...cities ]
    },
    discipline: {
      type: 'string',
      title: 'Discipline',
      enum: [ undefined, ...disciplines ]
    },
    event: {
      type: 'string',
      title: 'Event',
      enum: [ undefined, ...events ]
    },
    country: {
      type: 'string',
      title: 'Country',
      enum: [ undefined, ...countries ]
    },
    color: {
      type: 'string',
      title: 'Color',
      enum: [ undefined, ...colors ]
    },
    gender: {
      type: 'string',
      title: 'Gender',
      enum: [undefined, ...genders]
    }
  }
}

const Select = props => {
  const { label, options, value, required, disabled, readOnly, onChange } = props
  const suiOptions = options.enumOptions.map(({ label, value }) => {
    const _label = label === 'undefined' ? '' : label
    return { text: _label, value }
  })
  const onChangeFn = (event, data) => {
    console.log('Inside on change fn')
    console.log(data.value)
    onChange(data.value)
  }

  return (<Form.Select
    options={suiOptions}
    placeholder={label}
    required={required}
    disabled={disabled}
    label={null}
    readOnly={readOnly}
    value={`${value}`}
    onChange={onChangeFn}
  />)
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

export const validate = (formData, errors) => {
  if (formData.status === 'editing') {
    return errors
  }
  return []
}

export const widgets = { 'select': Select }
