import { pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core';

// User entity - stores Farcaster user information
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fid: text('fid').notNull().unique(),
  walletAddress: text('wallet_address'),
  savedRights: jsonb('saved_rights').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// RightsModule entity - stores legal rights information
export const rightsModules = pgTable('rights_modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  detailedContent: text('detailed_content').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  type: text('type').notNull(), // e.g., 'tenant', 'workplace', 'consumer'
  isPremium: boolean('is_premium').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Template entity - stores dispute resolution templates
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  usageInstructions: text('usage_instructions').notNull(),
  category: text('category').notNull(), // e.g., 'tenant-complaint', 'demand-letter'
  isPremium: boolean('is_premium').default(true),
  price: text('price').default('0.01'), // Price in USDC
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// UserSaves entity - tracks what users have saved
export const userSaves = pgTable('user_saves', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  itemType: text('item_type').notNull(), // 'rights_module' or 'template'
  itemId: uuid('item_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payments entity - tracks micro-transactions
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  itemType: text('item_type').notNull(),
  itemId: uuid('item_id').notNull(),
  amount: text('amount').notNull(),
  currency: text('currency').default('USDC'),
  transactionHash: text('transaction_hash'),
  status: text('status').default('pending'), // 'pending', 'completed', 'failed'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

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
