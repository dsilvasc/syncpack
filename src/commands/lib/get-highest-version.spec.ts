import { getHighestVersion } from './get-highest-version';

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

describe('getHighestVersion', () => {
  it('returns the newest version from an array of versions', () => {
    const a = ['<1.0.0'];
    const b = shuffle([...a, '<=1.0.0']);
    const c = shuffle([...b, '1.0.0']);
    const d = shuffle([...c, '~1.0.0']);
    const e = shuffle([...d, '1.x.x']);
    const f = shuffle([...e, '^1.0.0']);
    const g = shuffle([...f, '>=1.0.0']);
    const h = shuffle([...g, '>1.0.0']);
    const i = shuffle([...h, '*']);
    const j = shuffle([...i, 'http://asdf.com/asdf.tar.gz']);
    const k = shuffle([...j, 'file:../foo/bar']);
    const l = shuffle([...k, 'latest']);
    const m = shuffle([...l, 'git+ssh://git@github.com:npm/cli.git#v1.0.27']);
    const n = shuffle([...m, 'git+ssh://git@github.com:npm/cli#semver:^5.0']);
    const o = shuffle([...n, 'git+https://isaacs@github.com/npm/cli.git']);
    const p = shuffle([...o, 'git://github.com/npm/cli.git#v1.0.27']);
    const q = shuffle([...p, 'expressjs/express']);
    const r = shuffle([...q, 'mochajs/mocha#4727d357ea']);
    const s = shuffle([...r, 'user/repo#feature/branch']);
    // valid semver
    expect(getHighestVersion(a)).toEqual('<1.0.0');
    expect(getHighestVersion(b)).toEqual('<=1.0.0');
    expect(getHighestVersion(c)).toEqual('1.0.0');
    expect(getHighestVersion(d)).toEqual('~1.0.0');
    expect(getHighestVersion(e)).toEqual('1.x.x');
    expect(getHighestVersion(f)).toEqual('^1.0.0');
    expect(getHighestVersion(g)).toEqual('>=1.0.0');
    expect(getHighestVersion(h)).toEqual('>1.0.0');
    expect(getHighestVersion(i)).toEqual('*');
    // invalid semver
    expect(getHighestVersion(j)).toEqual('*');
    expect(getHighestVersion(k)).toEqual('*');
    expect(getHighestVersion(l)).toEqual('*');
    expect(getHighestVersion(m)).toEqual('*');
    expect(getHighestVersion(n)).toEqual('*');
    expect(getHighestVersion(o)).toEqual('*');
    expect(getHighestVersion(p)).toEqual('*');
    expect(getHighestVersion(q)).toEqual('*');
    expect(getHighestVersion(r)).toEqual('*');
    expect(getHighestVersion(s)).toEqual('*');
  });
});
