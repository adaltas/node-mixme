type AnObject = Record<string, unknown>;

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableArray
  | SerializableObject;

type SerializableArray = SerializableValue[];

type SerializableObject = {
  [key: string]: SerializableValue;
};

type Merge<T extends object[]> = T extends [
  infer Head extends object,
  ...infer Tail extends object[],
]
  ? Tail extends []
    ? Head
    : Merge<
        [
          MergeObjects<Head, Tail[0]>,
          // eslint-disable-next-line
          ...(Tail extends [infer _First, ...infer Rest] ? Rest : []),
        ]
      >
  : never;

type MergeObjects<T extends object, U extends object> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends Buffer
        ? T[K]
        : U[K] extends object
          ? MergeObjects<T[K], U[K]>
          : T[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
  : S;

type SnakeCaseKeys<T> =
  T extends Array<infer U>
    ? Array<SnakeCaseKeys<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeCase<string & K>]: SnakeCaseKeys<T[K]>;
        }
      : T;

export function camelize<T extends Record<string, unknow>>(
  source: T,
  depth: boolean | number = true,
): SnakeCaseKeys<T> {
  const target: Record<string, unknown> = {};
  if (is_object_literal(source)) {
    const d = typeof depth === "number" && depth > 0 ? depth - 1 : depth;
    for (const key of Object.keys(source)) {
      const value = source[key];
      const camelizedKey = depth ? camelize_str(key) : key;
      target[camelizedKey] = camelize(value, d);
    }
  } else {
    return source as SnakeCaseKeys<T>;
  }
  return target as SnakeCaseKeys<T>;
}

export function camelize_str(str: string): string {
  return str.replace(/[_.-](\w|$)/g, (_: string, x: string) => x.toUpperCase());
}

export function compare(el1: unknown, el2: unknown): boolean {
  if (is_object_literal(el1) && is_object_literal(el2)) {
    const keys1 = Object.keys(el1).sort();
    const keys2 = Object.keys(el2).sort();
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keys1.every(
      (key, i) => key === keys2[i] && compare(el1[key], el2[key]),
    );
  }

  if (Array.isArray(el1) && Array.isArray(el2)) {
    if (el1.length !== el2.length) {
      return false;
    }
    return el1.every((item, i) => compare(item, el2[i]));
  }

  return el1 === el2;
}

export function clone<T>(target: T): T {
  if (Array.isArray(target)) {
    return target.map((element) => clone(element)) as T;
  }
  if (target && typeof target === "object") {
    return mutate({}, target as AnObject) as T;
  }
  return target;
}

export function is_object(obj: unknown): obj is AnObject {
  return Boolean(obj) && typeof obj === "object" && !Array.isArray(obj);
}

export function is_object_literal(obj: unknown): obj is SerializableObject {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return true;
  }
  let test = obj;
  while (true) {
    if (Object.getPrototypeOf((test = Object.getPrototypeOf(test))) === null)
      break;
  }
  return Object.getPrototypeOf(obj) === test;
}

export function merge<T extends object[]>(...args: T): Merge<T> {
  return mutate({}, ...args);
}

export function mutate<T extends object[]>(
  target: object | null | undefined,
  ...args: T
): Merge<T> {
  for (let i = 0; i < args.length; i++) {
    const source = args[i];
    if (is_object_literal(source)) {
      if (target == null || !is_object_literal(target)) {
        target = {};
      }
      const targetObj = target as AnObject;
      for (const name of Object.keys(source)) {
        if (/__proto__|prototype/.test(name)) {
          continue;
        }
        targetObj[name] = mutate(
          targetObj[name] as object,
          source[name] as object,
        );
      }
    } else if (Array.isArray(source)) {
      target = source.map((element) => clone(element));
    } else if (source !== undefined) {
      target = source;
    }
  }
  return target as Merge<T>;
}

export function snake_case<T extends Record<string, unknow>>(
  source: T,
  depth: boolean | number = true,
): SnakeCaseKeys<T> {
  const target: Record<string, unknown> = {};
  if (is_object_literal(source)) {
    const d = typeof depth === "number" && depth > 0 ? depth - 1 : depth;
    for (const key of Object.keys(source)) {
      const value = source[key];
      const snakeKey = depth ? snake_case_str(key) : key;
      target[snakeKey] = snake_case(value, d);
    }
  } else {
    return source as SnakeCaseKeys<T>;
  }
  return target as SnakeCaseKeys<T>;
}

export function snake_case_str(str: string): string {
  return str
    .replace(/([a-z\d])([A-Z]+)/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}
