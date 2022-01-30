import { Character, KeyState } from './types.d';

const isCharacter = (c: string): c is Character => {
  return 'abcdefghijklmnopqrstuvwzyz'.includes(c)
}

export const str2Char = (str: string) => {
  const res = str.toLowerCase().charAt(0);
  if (isCharacter(res))
    return res;
  else
    return ''; // dunno lol
}

export const getEmptyKeyState = (): KeyState => {
  return {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
    '': 0,
  }
}

export const validate = (c: string, position: number, word: string) => {
  if (word.indexOf(c) === -1)
    return 1;
  else if (word.indexOf(c) !== position)
    return 2;
  else
    return 3;
}