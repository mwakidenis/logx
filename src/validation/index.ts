import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isPlainObject,
  isFunction,
  isDate,
  isNil,
  isNull,
  isUndefined,
  isMap,
  isSet,
} from "../internal/predicates";

export {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isPlainObject,
  isFunction,
  isDate,
  isNil,
  isNull,
  isUndefined,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

export function isEmail(value: unknown): boolean {
  if (!isString(value)) return false;
  return EMAIL_REGEX.test(value);
}

export function isURL(value: unknown): boolean {
  if (!isString(value)) return false;
  return URL_REGEX.test(value);
}

export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isObject(value)) {
    if (isMap(value) || isSet(value)) return value.size === 0;
    return Object.keys(value).length === 0;
  }
  return true;
}
