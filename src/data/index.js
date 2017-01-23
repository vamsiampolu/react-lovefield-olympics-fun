import { schema, Type, fn, order } from 'lovefield'

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
    }
  }

  if (hostingCity != null) {
    if (column !== 'hostingCity') {
      conditions = [ ...conditions, model.city.eq(hostingCity) ]
    }
  }

  if (discipline != null) {
    if (column !== 'discipline') {
      conditions = [ ...conditions, model.discipline.eq(discipline) ]
    }
  }

  if (event != null) {
    if (column !== 'event') {
      conditions = [ ...conditions, model.event.eq(event) ]
    }
  }

  if (country != null) {
    if (column !== 'country') {
      conditions = [ ...conditions, model.country.eq(country) ]
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
  .orderBy(medal.year, order.ASC)
}

export const selectHostingCities = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('hostingCity', model, formData)
  return db.select(
      fn.distinct(model.city)
    )
    .from(model)
    .where(...conditions)
    .orderBy(model.city, order.ASC)
}

export const selectDiscipline = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('discipline', model, formData)
  return db.select(
     fn.distinct(model.discipline)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.discipline, order.ASC)
}

export const selectEvent = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('event', model, formData)

  return db.select(
    fn.distinct(model.event)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.event, order.ASC)
}

export const selectCountry = (db, formData) => {
  const model = db.getSchema().table('Medal')
  const conditions = getConditions('country', model, formData)

  return db.select(
    fn.distinct(model.country)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.country, order.ASC)
}
