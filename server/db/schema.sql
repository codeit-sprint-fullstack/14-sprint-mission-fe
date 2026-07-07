CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL CHECK (char_length(trim(name)) >= 1),
  description TEXT NOT NULL CHECK (
    char_length(trim(description)) >= 10
    AND char_length(trim(description)) <= 100
  ),
  price INTEGER NOT NULL CHECK (price >= 0),
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products
ADD COLUMN IF NOT EXISTS image TEXT;

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL CHECK (char_length(trim(title)) >= 1),
  content TEXT NOT NULL CHECK (char_length(trim(content)) >= 1),
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL CHECK (char_length(trim(content)) >= 1),
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (
    (product_id IS NOT NULL AND article_id IS NULL)
    OR (product_id IS NULL AND article_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_product_comments_cursor ON comments(product_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_article_comments_cursor ON comments(article_id, id DESC);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_articles_updated_at ON articles;
CREATE TRIGGER trg_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_comments_updated_at ON comments;
CREATE TRIGGER trg_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
