import { pgTable, text, timestamp, boolean, decimal, jsonb, serial } from 'drizzle-orm/pg-core';

// Users table - stores Farcaster user information
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fid: text('fid').notNull().unique(), // Farcaster ID
  walletAddress: text('wallet_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Rights modules table - stores legal rights information
export const rightsModules = pgTable('rights_modules', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  detailedContent: text('detailed_content').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  type: text('type').notNull(), // tenant, workplace, consumer, legal
  isPremium: boolean('is_premium').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Templates table - stores dispute resolution templates
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  usageInstructions: text('usage_instructions').notNull(),
  category: text('category').notNull(),
  isPremium: boolean('is_premium').default(true),
  price: decimal('price', { precision: 10, scale: 2 }).default('0.01'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User saves table - stores user's saved modules and templates
export const userSaves = pgTable('user_saves', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  itemType: text('item_type').notNull(), // 'module' or 'template'
  itemId: text('item_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payments table - stores micro-transaction records
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  itemType: text('item_type').notNull(), // 'template' or 'module'
  itemId: text('item_id').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USDC'),
  transactionHash: text('transaction_hash'),
  status: text('status').default('pending'), // pending, completed, failed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type RightsModule = typeof rightsModules.$inferSelect;
export type NewRightsModule = typeof rightsModules.$inferInsert;
export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
export type UserSave = typeof userSaves.$inferSelect;
export type NewUserSave = typeof userSaves.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
