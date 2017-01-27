import React from 'react'
import { Form, Message, Header } from 'semantic-ui-react'
import ObjectField from './components/ObjectField'
import domains from './data/column_domains'
import uuid from 'node-uuid'

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
      type: 'array',
      title: 'Hosting City',
      items: {
        type: 'string',
        enum: [ undefined, ...cities ]
      },
      uniqueItems: true
    },
    discipline: {
      type: 'array',
      title: 'Discipline',
      items: {
        type: 'string',
        enum: [ undefined, ...disciplines ]
      },
      uniqueItems: true
    },
    event: {
      type: 'array',
      title: 'Event',
      items: {
        type: 'string',
        enum: [ undefined, ...events ]
      },
      uniqueItems: true
    },
    country: {
      type: 'array',
      title: 'Country',
      items: {
        type: 'string',
        enum: [ undefined, ...countries ]
      },
      uniqueItems: true
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

export const uiSchema = {
  year: {
    'ui:field': 'RangeSelectField'
  },
  hostingCity: {
    'ui:options': {
      search: true
    },
    items: {
      'ui:widget': 'multipleselect'
    }
  },
  discipline: {
    'ui:options': {
      search: true
    },
    items: {
      'ui:widget': 'multipleselect'
    }
  },
  event: {
    'ui:options': {
      search: true
    },
    items: {
      'ui:widget': 'multipleselect'
    }
  },
  country: {
    'ui:options': {
      search: true
    },
    items: {
      'ui:widget': 'multipleselect'
    }
  }
}

const Select = props => {
  const { label, options, value, required, disabled, readOnly, onChange, multiple } = props
  const {
    search = false,
    enumOptions
  } = options
  const suiOptions = enumOptions.map(({ label, value }) => {
    const _label = label === 'undefined' ? '' : label
    const key = uuid.v4()
    return { text: _label, value, key }
  })
  const onChangeFn = (event, data) => {
    onChange(data.value)
  }

  let res
  if (multiple) {
    console.log(options)
    res = (<Form.Select
      options={suiOptions}
      placeholder={label}
      required={required}
      disabled={disabled}
      label={null}
      readOnly={readOnly}
      value={value}
      onChange={onChangeFn}
      multiple
      search={search}
    />)
  } else {
    res = (<Form.Select
      options={suiOptions}
      placeholder={label}
      required={required}
      disabled={disabled}
      label={null}
      readOnly={readOnly}
      value={`${value}`}
      onChange={onChangeFn}
      search={search}
    />)
  }

  return res
}

export class RangeInput extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      formData: props.formData
    }
  }

  onChange (name) {
    return event => {
      this.setState({
        [name]: parseInt(event.target.value, 10)
      }, () => {
        this.props.onChange(this.state)
      })
    }
  }

  render () {
    const { schema } = this.props
    const { from, to } = this.state
    const {
      properties: {
        from: {
          title: fromLabel
        },
        to: {
          title: toLabel
        }
      }
    } = schema
    return (<div className='two fields'>
      <Form.Input label={fromLabel} placeholder={fromLabel} value={from} onChange={this.onChange('from')} />
      <Form.Input label={toLabel} placeholder={toLabel} value={to} onChange={this.onChange('to')} />
    </div>)
  }
}

export class RangeSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: props.formData
    }
  }

  onChange (name) {
    return value => {
      this.setState({
        [name]: parseInt(value, 10)
      }, () => {
        this.props.onChange(this.state)
      })
    }
  }

  render () {
    console.log(this.props)
    const { schema, required, disabled, readonly } = this.props
    const { from, to } = this.state.formData
    const {
      properties: {
        from: {
          title: fromLabel,
          enum: _fromOptions
        },
        to: {
          title: toLabel,
          enum: _toOptions
        }
      }
    } = schema

    const fromOptions = _fromOptions.map(item => {
      const label = item == null ? '' : item
      const key = uuid.v4()
      return { text: `${label}`, value: item, key }
    })

    const toOptions = _toOptions.map(item => {
      const label = item == null ? '' : item
      const key = uuid.v4()
      return { text: `${label}`, value: item, key }
    })

    return (<div>
      <Form.Select
        required={required}
        disabled={disabled}
        readonly={readonly}
        options={fromOptions}
        value={from}
        label={fromLabel}
        onChange={this.onChange('from')}
      />
      <Form.Select
        required={required}
        disabled={disabled}
        readonly={readonly}
        options={toOptions}
        value={to}
        label={toLabel}
        onChange={this.onChange('to')}
      />
    </div>)
  }
}

export class NumberRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.start
    }
  }

  sanitize () {
    if (typeof this.props.min !== 'number') {
      settings.min = parseInt(settings.min) || 0
    }
    if (typeof this.props.max !== 'number') {
      settings.max = parseInt(settings.max) || false
    }
    if (typeof this.props.start !== 'number') {
      settings.start = parseInt(settings.start) || 0
    }
  }

  determinePrecision () {
    const steps = this.props.steps.toString()
    const decimalPoint = steps.indexOf('.')
    let decimalPlaces = 0
    if (decimalPoint !== -1) {
      decimalPlaces = (steps.slice(decimalPoint)).length
    }
    return 10 ^ decimalPlaces
  }

  determineValue () {
  
  }

  determinePosition () {
  
  }

  onDrag () {}

  onChange () {}

  render () {
    this.sanitize()
    return (<div class='ui range'>
      <div class='inner'>
        <div class='track' />
        <div class='track-fill' style='width: 539px;' />
        <div class='thumb' style='left: 529px;' />
      </div>
    </div>)
  }
}

NumberRange.defaultProps = {
  min: 0,
  max: false,
  step: 1,
  start: 0,
  input: false
}

const MultipleSelect = props => {
  return (<Select {...props} search multiple />)
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
  ObjectField: ObjectField,
  RangeInputField: RangeInput,
  RangeSelectField: RangeSelect
}

export const widgets = {
  'select': Select,
  'multipleselect': MultipleSelect
}

export const validate = (formData, errors) => {
  if (formData.status === 'editing') {
    return errors
  }
  return []
}

