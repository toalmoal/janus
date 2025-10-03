import _  from 'lodash';

class Stats {
  sum: number;
  basisValues: Array<string>;
  entries: { [key: string]: {[key: string]: number} };

  constructor() {
    this.sum = 0;
    this.entries = {};
    this.basisValues = [];
  }

  setBasisValues(basisValues: Array<string>) {
    this.basisValues = basisValues;
  }

  add(type: string, entries: {[key: string]: number}) {
    this.entries[type] = entries;
    this.sum += entries['sum'] ?? 0;
  }

  emptyIfMissing(type: string) {
    if (_.isNil(this.entries[type])) {
      this.entries[type] = { 'sum': 0 };
    }
  }
}
export default Stats;
