type NestedObject = {
  [key: string]: NestedObject | string | number | boolean | null | undefined
}

export function get<T>(obj: NestedObject, path: string, defaultValue?: T): T | undefined {
  const isObject = (value: unknown): value is NestedObject =>
    value !== null && typeof value === 'object'

  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce<NestedObject | string | number | boolean | null | undefined>(
        (res, key) => (res !== null && res !== undefined && isObject(res) ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return (result === undefined ? defaultValue : result) as T | undefined
}
