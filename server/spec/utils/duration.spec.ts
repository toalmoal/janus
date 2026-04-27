import { it,
         expect,
         describe } from 'vitest';

import * as utils   from '../../src/utils';

describe('Duration', () => {

  it('today should be withing 1d', () => {
    expect(utils.isWithinDuration(new Date(), '1d')).toBe(true);
  });

  it('tomorrow should not be withing 1d', () => {
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + 1));
    date = new Date(date.setSeconds(date.getSeconds() + 1));

    expect(utils.isWithinDuration(date, '1d')).toBe(false);
  });

  it('tomorrow should not be withing 2d', () => {
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + 1));
    date = new Date(date.setSeconds(date.getSeconds() + 1));

    expect(utils.isWithinDuration(date, '2d')).toBe(true);
  });

});
