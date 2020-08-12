import { IsProjectEditablePipe } from './is-project-editable.pipe';

describe('IsProjectEditablePipe', () => {
  it('create an instance', () => {
    const pipe = new IsProjectEditablePipe();
    expect(pipe).toBeTruthy();
  });
});
