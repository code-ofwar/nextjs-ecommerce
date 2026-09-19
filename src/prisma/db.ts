import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { Temporal as TemporalPolyfill } from "temporal-polyfill";

(globalThis as typeof globalThis & { Temporal: typeof TemporalPolyfill }).Temporal =
  TemporalPolyfill

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});


