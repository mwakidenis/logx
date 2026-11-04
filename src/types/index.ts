export type Path = string | Array<string | number | symbol>;

export interface Dictionary<T> {
  [key: string]: T;
}

export type Primitive = string | number | boolean | null | undefined | symbol | bigint;

export type JsonPrimitive = string | number | boolean | null;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = Array<JsonValue>;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface GroupedRecord<T> {
  [key: string]: T[];
}

export type AlikeObject = Record<PropertyKey, unknown>;
export type NumericKey = string | number;

export interface TruncateOptions {
  length?: number;
  omission?: string;
}
