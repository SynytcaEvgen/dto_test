export interface PostgresInterval {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;

  toPostgres(): string;
  toISO(): string;
  toISOString(): string;
}
