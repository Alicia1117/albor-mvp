import { z } from 'zod';

/**
 * 以 uuid string 當作 id；若未來換雪花/ulid，集中修改
 */
export const idSchema = z.string().uuid();

/** 後端傳輸一律使用 ISO8601（含時區） */
export const isoDateTimeSchema = z.string().datetime({ offset: true });

/** 方便 infer type */
export type Id = z.infer<typeof idSchema>;
export type ISODateTime = z.infer<typeof isoDateTimeSchema>;
