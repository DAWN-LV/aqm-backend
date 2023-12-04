class QuerySettings {
  public selectFields: string[] = []
  public fromTable: string = ""
  public whereConditions: string[] = []
  public limitCount: number | null = null
  public orderByField: string = ""
  public orderByAscending: boolean = true
}

export default class QueryBuilder {
  private settings: QuerySettings

  constructor() {
    this.settings = new QuerySettings()
  }

  public select(fields: string[]): QueryBuilder {
    this.settings.selectFields = fields
    return this
  }

  public from(table: string): QueryBuilder {
      this.settings.fromTable = table
      return this
  }

  public where(condition: string): QueryBuilder {
      this.settings.whereConditions.push(condition)
      return this
  }

  public orderBy(field: string, ascending: boolean = true): QueryBuilder {
      this.settings.orderByField = field
      this.settings.orderByAscending = ascending
      return this
  }

  public limit(count: number): QueryBuilder {
      this.settings.limitCount = count
      return this
  }

  public build(): string {
      let query = `SELECT ${this.settings.selectFields.join(", ")} FROM ${this.settings.fromTable}`

      if (this.settings.whereConditions.length) {
          query += ` WHERE ${this.settings.whereConditions.join(" AND ")}`
      }

      if (this.settings.orderByField) {
          query += ` ORDER BY ${this.settings.orderByField} ${this.settings.orderByAscending ? "ASC" : "DESC"}`
      }

      if (this.settings.limitCount !== null) {
          query += ` LIMIT ${this.settings.limitCount}`
      }

      return query
  }
}