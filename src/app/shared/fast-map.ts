/**
 * FastMap. Time friendly, but not Space friendly
 * Type of key is number. Intended to use for list of objects which have some numeric identifiers
 * O(1) read
 * O(1) insert
 * O(1) update
 * O(1) remove
 */
export class FastMap {
  private _valueStore: any[] = [];
  private _indexStore: number[] = [];
  private _keys: number[] = [];
  private _values: any[] = [];

  constructor() {}

  public insert(key: number, value: any) {
    this._valueStore[key] = value;
    this._keys.push(key);
    this._values.push(value);
    this._indexStore[key] = this._keys.length - 1;
  }

  public update(key: number, newValue: any) {
    this._valueStore[key] = newValue;
    const index = this._indexStore[key];
    typeof index !== 'undefined' && (this._values[index] = newValue);
  }

  public read(key: number) {
    return this._valueStore[key];
  }

  public remove(key: number) {
    this._valueStore[key] = undefined;
    const index = this._indexStore[key];
    typeof index !== 'undefined' &&
      this._keys.splice(index, 1) &&
      this._values.splice(index, 1);
  }

  public size() {
    return this._keys.length;
  }

  public forEach(
    iterator: (key: number, value: any, index: number) => boolean | undefined
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
}
