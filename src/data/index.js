import { schema, Type, fn, Order, op } from 'lovefield'

const schemaBuilder = schema.create('olympia', 1)

export const medal = schemaBuilder.createTable('Medal')
  .addColumn('city', Type.STRING)
  .addColumn('color', Type.STRING)
  .addColumn('country', Type.STRING)
  .addColumn('discipline', Type.STRING)
  .addColumn('event', Type.STRING)
  .addColumn('eventGender', Type.STRING)
  .addColumn('firstName', Type.STRING)
  .addColumn('lastName', Type.STRING)
  .addColumn('gender', Type.STRING)
  .addColumn('sport', Type.STRING)
  .addColumn('year', Type.INTEGER)
  .addNullable(['firstName'])
  .addIndex('idx_year', ['year'])
  .addIndex('idx_lastName', ['lastName'])
export const dbPromise = schemaBuilder.connect()

export const selectAll = db => {
  const medal = db.getSchema().table('Medal')
  return db.select().from(medal).exec()
}

export const selectAllWithLimit = (db, perPage, offset) => {
  const model = db.getSchema().table('Medal')
  return db.select().from(model).limit(perPage).skip(offset).exec()
}

export const insertMedals = (medals, db) => {
  const medal = db.getSchema().table('Medal')
  const medalRows = medals.map(item => medal.createRow(item))
  return db.insert().into(medal).values(medalRows).exec()
}

export const getConditions = (column, model, formData) => {
  let conditions = []

  const {
    fromYear,
    toYear,
    hostingCity,
    discipline,
    event,
    country,
    color,
    gender
  } = formData

  if (fromYear != null && toYear != null) {
    if (column !== 'fromYear' && column !== 'toYear') {
      conditions = [ ...conditions, model.year.between(fromYear, toYear) ]
    } else if (column !== 'fromYear') {
      conditions = [ ...conditions, model.year.gte(fromYear) ]
    } else if (column !== 'toYear') {
      conditions = [ ...conditions, model.year.lte(toYear) ]
    }
  } else if (fromYear != null) {
    if (column !== 'fromYear') {
      conditions = [ ...conditions, model.year.gte(fromYear) ]
    }
  } else if (toYear != null) {
    if (column !== 'toYear') {
      conditions = [ ...conditions, model.year.lte(toYear) ]
    }
  }

  if (hostingCity != null && hostingCity.length > 0) {
    if (column !== 'hostingCity') {
      if (hostingCity.length > 1) {
        const cityConditions = hostingCity.map(item => model.city.eq(item))
        conditions = [ ...conditions, op.or(...cityConditions) ]
      } else if (hostingCity.length === 1) {
        conditions = [ ...conditions, model.city.eq(hostingCity[0]) ]
      }
    }
  }

  if (discipline != null) {
    if (column !== 'discipline' && discipline.length > 0) {
      if (discipline.length > 1) {
        const disciplineConditions = discipline.map(item => model.discipline.eq(item))
        conditions = [ ...conditions, op.or(...disciplineConditions) ]
      } else {
        conditions = [ ...conditions, model.discipline.eq(discipline[0]) ]
      }
    }
  }

  if (event != null && event.length > 0) {
    if (column !== 'event') {
      conditions = [ ...conditions, model.event.eq(event) ]
      if (event.length > 1) {
        const eventConditions = event.map(item => model.event.eq(item))
        conditions = [ ...conditions, op.or(...eventConditions) ]
      } else if (event.length === 1) {
        conditions = [ ...conditions, model.event.eq(event[0]) ]
      }
    }
  }

  if (country != null && country.length > 0) {
    if (column !== 'country') {
      if (event.length > 1) {
        const countryConditions = country.map(item => model.country.eq(item))
        conditions = [ ...conditions, op.or(...countryConditions) ]
      } else if (country.length === 1) {
        conditions = [ ...conditions, model.country.eq(country[0]) ]
      }
    }
  }

  if (color != null) {
    if (column !== 'color') {
      conditions = [ ...conditions, model.color.eq(color) ]
    }
  }

  if (gender != null) {
    if (column !== 'gender') {
      conditions = [ ...conditions, model.gender.eq(gender) ]
    }
  }

  return conditions
}

export const selectYears = db => {
  const medal = db.getSchema().table('Medal')

  return db.select(
    fn.distinct(medal.year)
  )
  .from(medal)
  .orderBy(medal.year, Order.ASC)
}

const selectYearsWithConditions = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions(null, model, formData)

  return db.select(
    fn.distinct(model.year).as('year'),
  )
  .from(model)
  .where(op.and(...conditions))
  .orderBy(model.year, Order.ASC)
}

export const selctWithConditionsAndLimit = (db, perPage, offset, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions(null, model, formData)
  const result = conditions.length > 0
  ? db.select().from(model).where(op.and(...conditions)).limit(perPage).skip(offset).exec()
  : selectAllWithLimit(db, perPage, offset)
  return result
}

export const getRowCount = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions(null, model, formData)
  let query
  if (conditions.length > 0) {
    query = db.select(
      fn.count(model.id)
    ).from(model).where(op.and(...conditions))
  } else {
    query = db.select(fn.count(model.id)).from(model)
  }

  return query.exec()
}

export const selectHostingCities = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('hostingCity', model, formData)
  return db.select(
      fn.distinct(model.city).as('hostingCity')
    )
    .from(model)
    .where(op.and(...conditions))
    .orderBy(model.city, Order.ASC)
}

export const selectDiscipline = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('discipline', model, formData)
  return db.select(
     fn.distinct(model.discipline).as('discipline')
  )
  .from(model)
  .where(op.and(...conditions))
  .orderBy(model.discipline, Order.ASC)
}

export const selectEvent = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('event', model, formData)

  return db.select(
    fn.distinct(model.event).as('event')
  )
  .from(model)
  .where(op.and(...conditions))
  .orderBy(model.event, Order.ASC)
}

export const selectCountry = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('country', model, formData)

  return db.select(
    fn.distinct(model.country).as('country')
  )
  .from(model)
  .where(op.and(...conditions))
  .orderBy(model.country, Order.ASC)
}

export const formPanelQuery = (db, column, formData) => {
  const queryableColumns = ['year', 'hostingCity', 'discipline', 'event', 'country']
  let queries
  const queryFns = {
    year: selectYearsWithConditions,
    hostingCity: selectHostingCities,
    discipline: selectDiscipline,
    event: selectEvent,
    country: selectCountry
  }
  if (column !== null && queryableColumns.indexOf(column)) {
    const colIndex = queryableColumns.indexOf(column)
    if (colIndex !== -1) {
      queryableColumns.splice(colIndex, 1)
    }
    queries = Promise.all(
      queryableColumns.map(column => {
        const query = queryFns[column]
        return query(db, formData).exec()
      })
    )
  } else {
    queries = Promise.all(
      queryableColumns.map(column => {
        const query = queryFns[column]
        return query(db, formData).exec()
      })
    )
  }

  return queries
}
