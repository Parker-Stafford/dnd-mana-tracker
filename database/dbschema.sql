CREATE TABLE accounts
  (
    id                   SERIAL,
    compound_id          VARCHAR(255) NOT NULL,
    user_id              INTEGER NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    refresh_token        TEXT,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE sessions
  (
    id            SERIAL,
    user_id       INTEGER NOT NULL,
    expires       TIMESTAMPTZ NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    access_token  VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE users
  (
    id             SERIAL,
    name           VARCHAR(255),
    email          VARCHAR(255),
    email_verified TIMESTAMPTZ,
    image          VARCHAR(255),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE verification_requests
  (
    id         SERIAL,
    identifier VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    expires    TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE characters
  (
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    current_mana INTEGER,
    max_mana INTEGER NOT NULL,
    photo_url VARCHAR(255),
    level INTEGER NOT NULL,
    mana_pots INTEGER,
    greater_pots INTEGER,
    campaign_id INTEGER,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_campaign
      FOREIGN KEY(campaign_id)
        REFERENCES campaigns(id)
        ON DELETE CASCADE
  );

CREATE TABLE campaigns
  (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    mana_Dice_Type INTEGER,
    mana_Num_Of_Dice INTEGER,
    mana_Mods INTEGER,
    greater_Dice_Type INTEGER,
    greater_Num_Of_Dice INTEGER,
    greater_Mods INTEGER,
    cantrip_cost INTEGER,
    spell_1_cost  INTEGER,
    spell_2_cost  INTEGER,
    spell_3_cost  INTEGER,
    spell_4_cost  INTEGER,
    spell_5_cost  INTEGER,
    spell_6_cost  INTEGER,
    spell_7_cost  INTEGER,
    spell_8_cost  INTEGER,
    spell_9_cost  INTEGER,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
  );

/* Potential option later */
/*
CREATE TABLE potions
  (
    id SERIAL,
    name VARCHAR(255),
    effect VARCHAR(255),
    restore INTEGER,
    level_req INTEGER,
    character_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (id),
      CONSTRAINT fk_character
        FOREIGN KEY(character_id)
          REFERENCES characters(id)
          ON DELETE CASCADE
  );

CREATE INDEX char_id_potion_idx
  ON potions(character_id);

  insert into characters(name,current_mana,max_mana,level,mana_pots,greater_pots,user_id) values ('parker',50,50,1,0,0,1);

  */

ALTER TABLE accounts
ADD CONSTRAINT  fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE sessions
ADD CONSTRAINT  fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;


CREATE INDEX user_id_char_idx
  ON users(id);

CREATE UNIQUE INDEX compound_id_idx
  ON accounts(compound_id);

CREATE INDEX provider_account_id_idx
  ON accounts(provider_account_id);

CREATE INDEX provider_id_idx
  ON accounts(provider_id);

CREATE INDEX user_id_idx
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token_idx
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token_idx
  ON sessions(access_token);

CREATE UNIQUE INDEX email_idx
  ON users(email);

CREATE UNIQUE INDEX token_idx
  ON verification_requests(token);
