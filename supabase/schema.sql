-- Wedy Wedding Invitation Platform — Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Templates table (metadata; templates themselves are code-based)
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  preview_image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  template_id TEXT NOT NULL REFERENCES templates(id),
  invitation_id UUID,
  invitation_slug TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('instapay', 'vodafone_cash')),
  payment_screenshot TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'approved', 'rejected')),
  order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'approved', 'rejected', 'cancelled')),
  invitation_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- Invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  template_id TEXT NOT NULL REFERENCES templates(id),
  order_id UUID NOT NULL REFERENCES orders(id),
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'disabled')),
  start_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin profiles (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_template_id ON orders(template_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_template_id ON invitations(template_id);

-- Add foreign key from orders to invitations (after invitations table exists)
ALTER TABLE orders
  ADD CONSTRAINT fk_orders_invitation
  FOREIGN KEY (invitation_id) REFERENCES invitations(id)
  ON DELETE SET NULL;

-- Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public can read active templates
CREATE POLICY "Public read active templates" ON templates
  FOR SELECT USING (active = true);

-- Public can read active invitations by slug (via API/server)
CREATE POLICY "Public read active invitations" ON invitations
  FOR SELECT USING (status = 'active');

-- Admins can do everything (authenticated users with admin profile)
CREATE POLICY "Admin full access templates" ON templates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin full access invitations" ON invitations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin read own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

-- Seed templates
INSERT INTO templates (id, name, description, price, preview_image, active) VALUES
  ('template-01', 'Elegant Ivory', 'Minimal ivory design with champagne gold accents.', 299, '/templates/template-01-preview.jpg', true),
  ('template-02', 'Midnight Gold', 'Luxury dark theme with dramatic gold accents.', 399, '/templates/template-02-preview.jpg', true),
  ('template-03', 'Romantic Bloom', 'Soft floral romantic design with photo-focused layout.', 349, '/templates/template-03-preview.jpg', true)
ON CONFLICT (id) DO NOTHING;

-- Storage buckets (run in Supabase Dashboard > Storage)
-- 1. Create bucket: payment-screenshots (PRIVATE)
-- 2. Create bucket: wedding-images (PUBLIC)
-- 3. Set policies accordingly
