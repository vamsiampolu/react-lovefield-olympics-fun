import { schema, Type, fn, order } from 'lovefield'

const schemaBuilder = schema.create('olympia', 1)

export const medal = schemaBuilder.createTable('Medal')
  .addColumn('id', Type.INTEGER)
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

export const getDb = schemaBuilder.connect()

export const dbPromise = getDb()

export const dataExists = db => {
  const medal = db.getSchema().table('Medal')
  return db.select().from(medal).exec()
    .then(rows => (rows.length > 0))
    .catch(error => {
      console.log('Could not connect to the Lovefield db instance')
      console.error(error)
    })
}

export const insertMedals = (medals, db) => {
  const medal = db.getSchema().table('Medal')
  const medalRows = medals.map(item => medal.createRow(item))
  return db.insert().into(medal).values(medalRows).exec()
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
  const {
    fromYear,
    toYear
  } = formData

  const model = db.getSchema().table('Medal')
  return db.select(
      fn.distinct(model.city)
    )
    .from(model)
    .where(
        model.year.between(fromYear, toYear)
      )
    .orderBy(model.city, order.ASC)
}

export const selectDiscipline = (db, formData) => {
  const {
    fromYear,
    toYear,
    hostingCity
  } = formData

  const model = db.getSchema().table('Medal')
  let conditions = []

  if (fromYear != null && toYear != null) {
    conditions = [ ...conditions, model.year.between(fromYear, toYear) ]
  }

  if (hostingCity != null) {
    conditions = [ ...conditions, model.city.eq(hostingCity) ]
  }

  return db.select(
     fn.distinct(model.discipline)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.discipline, order.ASC)
}

export const selectEvent = (db, formData) => {
  const {
    fromYear,
    toYear,
    hostingCity,
    discipline
  } = formData

  const model = db.getSchema().table('Medal')
  let conditions = []

  if (fromYear != null && toYear != null) {
    conditions = [ ...conditions, model.year.between(fromYear, toYear) ]
  }

  if (hostingCity != null) {
    conditions = [ ...conditions, model.city.eq(hostingCity) ]
  }

  if (discipline != null) {
    conditions = [ ...conditions, model.discipline.eq(discipline) ]
  }

  return db.select(
    fn.distinct(model.event)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.event, order.ASC)
}

export const selectCountry = (db, formData) => {
  const {
    fromYear,
    toYear,
    hostingCity,
    discipline,
    event
  } = formData

  const model = db.getSchema().table('Medal')
  let conditions = []

  if (fromYear != null && toYear != null) {
    conditions = [ ...conditions, model.year.between(fromYear, toYear) ]
  }

  if (hostingCity != null) {
    conditions = [ ...conditions, model.city.eq(hostingCity) ]
  }

  if (discipline != null) {
    conditions = [ ...conditions, model.discipline.eq(discipline) ]
  }

  if (event != null) {
    conditions = [ ...conditions, model.event.eq(event) ]
  }

  return db.select(
    fn.distinct(model.country)
  )
  .from(model)
  .where(...conditions)
  .orderBy(model.country, order.ASC)
}
