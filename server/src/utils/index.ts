import _                  from 'lodash';
import fs                 from 'fs';
import path               from 'path';
import winston            from 'winston';
import { LoggerFactory }  from '@/logger';

const logger = LoggerFactory('utils')

export function pathToRelativeUri(p: string) {
  return p
    .split(path.sep).join('/')
    .split('/')
    .map(encodeURIComponent)
    .join('/');
};

const pad = (n: number) => (n < 10 ? '0' + n : n);

export function formattedDate(date: Date) {
  date = date ?? new Date();
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + ' ' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(':');
};

export function formatDuration(ms: number): string {
  if (ms < 0.01) return "instant";
  if (ms < 1)    return `${ms.toFixed(2)} ms`;
  if (ms < 1000) return `${Math.round(ms)} ms`;

  const secondsTotal = ms / 1000;

  if (secondsTotal < 60) {
    return `${secondsTotal.toFixed(2)} s`;
  }

  const minutes = Math.floor(secondsTotal / 60);
  const seconds = Math.floor(secondsTotal % 60);
  const remainingMs = Math.round((secondsTotal % 1) * 1000);

  if (minutes === 0) {
    return remainingMs > 50
      ? `${seconds + 1} s`
      : `${seconds} s`;
  }

  if (minutes < 10 && remainingMs > 500) {
    return `${minutes}m ${seconds + 1}s`;
  }

  return `${minutes}m ${seconds}s`;
};

export function mkdir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export function uniqueFolder(folder: string): number {
  mkdir(folder);
  try {
    const indexes = fs.readdirSync(folder, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => parseInt(item.name))
      .filter(idx => !isNaN(idx));
      return (_.max(indexes) ?? 0) + 1;
  } catch (err: any) {
    logger.warn('While reading folder contents:', err);
    return 1;
  }
};

export async function timed<T>(
    promise: Promise<T>,
    label: string,
  ): Promise<T> {
  const start = process.hrtime.bigint();
  logger.info(`${label} started...`);
  try {
    const result = await promise;

    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const pretty = formatDuration(durationMs);

    logger.info(`${label} completed in ${pretty}`);

    return result;
  } catch (err) {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const pretty = formatDuration(durationMs);

    logger.error(`${label} failed after ${pretty}`, err);
    throw err;
  }
};

export function randomCode(len: number) {
  return [...Array(len)].map( _ =>Math.random()*10|0).join('');
};

type DurationUnit = "d" | "m";
type DurationString = `${number}${DurationUnit}` | "" | null | undefined;

interface DurationParts {
  amount: number;
  unit: DurationUnit;
}

export function parseDuration(duration: DurationString): DurationParts {
  if (!duration || typeof duration !== 'string') {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const match = /^(\d+)([dm])$/.exec(duration);

  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  return {
    amount: Number(match[1]),
    unit: match[2] as DurationUnit,
  };
};

export function isWithinDuration(
  startDate: Date,
  duration: DurationString
): boolean {
  const { amount, unit } = parseDuration(duration);

  const endDate = new Date();

  switch (unit) {
    case "d":
      endDate.setDate(endDate.getDate() + amount);
      break;
    case "m":
      endDate.setMonth(endDate.getMonth() + amount);
      break;
  }

  return (
    endDate.getTime() >= startDate.getTime() &&
    endDate.getTime() <= endDate.getTime()
  );
};
