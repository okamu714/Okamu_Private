import { z } from 'zod';

export const transactionSchema: any = z.object({
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, { message: '日付の入力が必要です' }),
  amount: z.number().min(1, { message: '金額は一円以上の入力が必要です' }),
  content: z
    .string()
    .min(1, { message: '内容の入力が必要です' })
    .max(50, { message: '内容は50字以内にして下さい' }),

  category: z
    .union([
      z.enum([
        '食費',
        '日用品',
        '住宅費',
        '交際費',
        '娯楽',
        '電子決済',
        'ポイント使用',
        '銀行送金',
      ]),
      z.enum(['給与', '副収入', 'お小遣い']),
      z.literal(''),
    ])
    .refine((val) => val !== '', { message: 'カテゴリを選択して下さい' }),
});

export type Schema = z.infer<typeof transactionSchema>;
