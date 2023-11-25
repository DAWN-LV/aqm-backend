export default class InfluxQL {
  private parts: string[] = []

  select(fields: string | string[]): InfluxQL {
    this.parts.push(`SELECT ${Array.isArray(fields) ? fields.join(', ') : fields}`)
    return this
  }

  from(measurement: string): InfluxQL {
    this.parts.push(`FROM ${measurement}`);
    return this;
  }

  where(condition: string): InfluxQL {
    this.parts.push(`WHERE ${condition}`);
    return this;
  }

  groupBy(field: string): InfluxQL {
    this.parts.push(`GROUP BY ${field}`);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): InfluxQL {
    this.parts.push(`ORDER BY ${field} ${direction}`);
    return this;
  }

  limit(n: number): InfluxQL {
    this.parts.push(`LIMIT ${n}`);
    return this;
  }

  build(): string {
    return this.parts.join(' ');
  }
}