import { z } from 'zod';
import { idSchema, isoDateTimeSchema } from './base';

/**
 * 基本 User DTO（不展開關聯陣列，避免 payload 膨脹）
 * 如需帶關聯，建議在各自的 feature 裡定義 ViewModel/Compound DTO。
 */
export const userSchema = z.object({
    id: idSchema,
    email: z.string().email(),
    name: z.string().nullable().optional(),
    createdAt: isoDateTimeSchema,
});

/** 建立/更新：email 必填，name 可空 */
export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string().optional().nullable(),
});

export const updateUserSchema = z.object({
    name: z.string().optional().nullable(),
});

export type UserDTO = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
