import axios from 'axios';
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

export const validate = (word: string, ans: string): Array<number> => {
  const res = new Array(word.length).fill(1); // verdict for each letter in `word`
  const mark = new Array(ans.length).fill(false); // whether or not a letter in `ans` have been matched to a letter in `word`
  word.split('').forEach((letter, ind) => {
    if (letter === ans[ind]) {
      res[ind] = 3;
      mark[ind] = true;
    }
  });
  word.split('').forEach((letter, ind) => {
    if (res[ind] !== 1)
      return;

    let found = false;
    ans.split('').forEach((letter2, ind2) => {
      if (found)
        return;
      if (letter === letter2 && !mark[ind2]) {
        res[ind] = 2;
        mark[ind2] = true;
        found = true;
      }
    });
  });

  console.log(word, ans, res);
  return res;
}

export const getWord = async (length: number) => {
  const list = (await axios.get(`https://gist.githubusercontent.com/haile01/f917b3a349d22796ba08427068bdf034/raw/f91e3d330607ad1ef3f061300adcc21cfa9e87c6/${length}.txt`)).data.split('\n');
  return list[Math.floor(Math.random() * list.length)];
}

export const checkInvalid = async (word: string) => {
  const length = word.length;
  const list = (await axios.get(`https://gist.githubusercontent.com/haile01/f917b3a349d22796ba08427068bdf034/raw/f91e3d330607ad1ef3f061300adcc21cfa9e87c6/${length}.txt`)).data.split('\n');
  return list.indexOf(word) === -1;
}

export interface Stats {
  played: number,
  winCount: number,
  currentStreak: number,
  maxStreak: number,
  distribution: Array<number>,
}

export const saveStats = (stats: Stats) => {
  const data = JSON.stringify(stats);
  localStorage.setItem('stats', data);
}

export const loadStats = (): Stats => {
  const data = localStorage.getItem('stats');
  const defaultStats: Stats = {
    played: 0,
    winCount: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: new Array(6).fill(0),
  };

  if (!data || data === "") {
    return defaultStats
  }
  else {
    try {
      return JSON.parse(data);
    }
    catch (e) {
      console.error(e);
      return defaultStats;
    }
  }
}