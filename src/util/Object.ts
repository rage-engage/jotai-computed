// Credit to https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
export interface ObjectComparison {
  added: {};
  updated: {
    [propName: string]: {
      oldValue: any;
      newValue: any;
    };
  };
  removed: {};
  unchanged: {};
  hasChanged: boolean;
}

export interface LooseObject {
  [key: string]: any;
}

export const isObject = (obj: Record<"string", any>) => {
  return obj !== null && typeof obj === "object";
};

export const diff = (
  o1: LooseObject,
  o2: LooseObject,
  deep = false
): ObjectComparison => {
  const added: LooseObject = {};
  const updated: LooseObject = {};
  const removed: LooseObject = {};
  const unchanged: LooseObject = {};
  let hasChanged = false;
  for (const prop in o1) {
    if (Object.prototype.hasOwnProperty.call(o1, prop)) {
      const o2PropValue = o2[prop];
      const o1PropValue = o1[prop];
      if (Object.prototype.hasOwnProperty.call(o2, prop)) {
        if (o2PropValue === o1PropValue) {
          unchanged[prop] = o1PropValue;
        } else {
          updated[prop] =
            deep && isObject(o1PropValue) && isObject(o2PropValue)
              ? diff(o1PropValue, o2PropValue, deep)
              : { newValue: o2PropValue };
        }
      } else {
        removed[prop] = o1PropValue;
      }
    }
  }
  for (const prop in o2) {
    if (Object.prototype.hasOwnProperty.call(o2, prop)) {
      const o1PropValue = o1[prop];
      const o2PropValue = o2[prop];
      if (Object.prototype.hasOwnProperty.call(o1, prop)) {
        if (o1PropValue !== o2PropValue) {
          if (!deep || !isObject(o1PropValue)) {
            updated[prop].oldValue = o1PropValue;
          }
        }
      } else {
        added[prop] = o2PropValue;
      }
    }
  }
  if (
    Object.keys(added).length > 0 ||
    Object.keys(updated).length > 0 ||
    Object.keys(removed).length > 0
  ) {
    hasChanged = true;
  }
  return { added, updated, removed, unchanged, hasChanged };
};
