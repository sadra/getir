import Record from '../../src/repositories/Record.model';

export const fixtures = () => {
  const records = [];

  while (records.length < 1000) {
    records.push(
      new Record({
        key: generateKey(7),
        value: generateKey(8),
        createdAt: randomDate(new Date('2020-01-01'), new Date('2021-01-01')),
        counts: randomCounts(),
      }),
    );
  }

  return records;
};

function generateKey(length: number): string {
  let result: string[] = [];
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }

  return result.join('');
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomCounts(): number[] {
  const ARRAY_LENGTH = randomNumber(1, 5);

  return Array.from(Array(ARRAY_LENGTH)).map((x) => randomNumber(0, 5000));
}

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);
