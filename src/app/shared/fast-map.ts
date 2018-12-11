/**
 * FastMap. Time friendly, but not Space friendly
 * Type of key is number. Intended to use for list of objects which have some numeric identifiers
 * O(1) read
 * O(1) insert
 * O(1) update
 * O(n) remove
 */
export class FastMap<T> {
  private _valueStore: T[] = [];
  private _indexStore: number[] = [];
  private _keys: number[] = [];
  private _values: T[] = [];
  private _keyField: string = 'id';
  private _errors = {
    keyField: `by default FastMap expects key to be 'id' field of element object`,
    exists: `This element is already exists`
  };
  public length = 0;

  constructor(list?: T[], keyField: string = 'id') {
    this._keyField = keyField;

    if (list) {
      list.forEach(item => {
        const key = item[this._keyField];
        if (!key) {
          throw Error(this._errors.keyField);
        }
        this.insert(item, key);
      });
    }
  }

  /**
   * if only value passed, then as a key value[keyField] will be used. keyField by default equals 'id'
   */
  public insert(value: T, key?: number) {
    if (typeof key === 'undefined') {
      if (!value[this._keyField]) {
        throw Error(this._errors.keyField);
      }
      key = value[this._keyField];
    }
    if (this.read(key)) {
      console.error(this._errors.exists, value, this.values());
      return this.length;
    }
    this._valueStore[key] = value;
    this._keys.push(key);
    this._values.push(value);
    this._indexStore[key] = this._keys.length - 1;
    this._indexStore.length++;

    return this.length;
  }

  /**
   * if only value passed, then as a key value[keyField] will be used. keyField by default equals 'id'
   */
  public update(newValue: T, key?: number) {
    if (typeof key === 'undefined') {
      if (!newValue[this._keyField]) {
        throw Error(this._errors.keyField);
      }
      key = newValue[this._keyField];
    }
    this._valueStore[key] = newValue;
    const index = this._indexStore[key];
    typeof index !== 'undefined' && (this._values[index] = newValue);
  }

  public read(key: number) {
    return this._valueStore[key];
  }

  public remove(key: number) {
    const index = this._indexStore[key];
    if (typeof index !== 'undefined') {
      this._keys.splice(index, 1);
      this._values.splice(index, 1);
      this._valueStore[key] = undefined;
      this._indexStore[key] = undefined;
      this.adjustIndexValues(index);
      this.length++;
    }
  }

  public forEach(
    iterator: (key: number, value: T, index: number) => boolean | undefined
  ) {
    for (let i = 0; i < this._keys.length; i++) {
      const key = this._keys[i];
      const value = this._valueStore[key];
      const wantToBreak = iterator(key, value, i);
      if (wantToBreak) {
        break;
      }
    }
  }

  public keys() {
    return this._keys;
  }

  public values() {
    return this._values;
  }

  private adjustIndexValues(index: number) {
    for (let i = index; i < this._keys.length; i++) {
      const key = this._keys[i];
      this._indexStore[key] = i;
    }
  }
}
