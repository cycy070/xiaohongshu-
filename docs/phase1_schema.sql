-- MirrorSoul (镜像灵魂)
-- Phase 1: Data structures & database models (PostgreSQL)

-- Optional extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) Activation code management
CREATE TABLE activation_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(64) NOT NULL UNIQUE,
    status VARCHAR(16) NOT NULL DEFAULT 'unused'
        CHECK (status IN ('unused', 'used', 'revoked')),

    -- Fingerprint binding (anti-sharing)
    bound_user_agent TEXT,
    bound_ip INET,
    bound_fingerprint_hash VARCHAR(128),

    used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- A code can only be considered used once
    CONSTRAINT used_code_must_have_binding CHECK (
        (status <> 'used') OR
        (used_at IS NOT NULL AND bound_user_agent IS NOT NULL AND bound_ip IS NOT NULL)
    )
);

CREATE INDEX idx_activation_codes_status ON activation_codes(status);
CREATE INDEX idx_activation_codes_expires_at ON activation_codes(expires_at);
CREATE INDEX idx_activation_codes_fingerprint ON activation_codes(bound_fingerprint_hash);


-- 2) Dimension master table
CREATE TABLE psych_dimensions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dimension_key VARCHAR(64) NOT NULL UNIQUE,
    display_name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed recommendation (5 core dimensions):
-- spiritual_independence, emotional_granularity, aesthetic_sensitivity,
-- relationship_control, subconscious_shadow


-- 3) Questions and options
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_order INT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_key VARCHAR(8) NOT NULL,
    option_text TEXT NOT NULL,
    option_order INT NOT NULL,
    emotion_tone VARCHAR(32), -- e.g. calm/anxious/neutral for audio modulation
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (question_id, option_key),
    UNIQUE (question_id, option_order)
);


-- 4) Non-linear weight matrix
-- Each option contributes percentage points to multiple dimensions.
CREATE TABLE option_dimension_weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id UUID NOT NULL REFERENCES question_options(id) ON DELETE CASCADE,
    dimension_id UUID NOT NULL REFERENCES psych_dimensions(id) ON DELETE CASCADE,
    weight_percent NUMERIC(6,2) NOT NULL, -- e.g. +10.00, -5.00
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (option_id, dimension_id)
);

CREATE INDEX idx_option_dimension_weights_option_id ON option_dimension_weights(option_id);
CREATE INDEX idx_option_dimension_weights_dimension_id ON option_dimension_weights(dimension_id);


-- 5) Test sessions (supports anti-hijack token expiration)
CREATE TABLE test_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activation_code_id UUID NOT NULL REFERENCES activation_codes(id),

    session_token_hash VARCHAR(128) NOT NULL UNIQUE,
    result_token_hash VARCHAR(128) UNIQUE,
    result_token_expires_at TIMESTAMPTZ,

    client_user_agent TEXT NOT NULL,
    client_ip INET NOT NULL,

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_sessions_activation_code_id ON test_sessions(activation_code_id);
CREATE INDEX idx_test_sessions_result_token_expiry ON test_sessions(result_token_expires_at);


-- 6) User answers (traceability for AI dynamic report)
CREATE TABLE user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES test_sessions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id),
    selected_option_id UUID NOT NULL REFERENCES question_options(id),
    response_time_ms INT,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (session_id, question_id)
);

CREATE INDEX idx_user_answers_session_id ON user_answers(session_id);


-- 7) Final computed results
CREATE TABLE user_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL UNIQUE REFERENCES test_sessions(id) ON DELETE CASCADE,

    -- Store normalized final scores per dimension
    dimension_scores JSONB NOT NULL,

    -- LLM generated output and derivatives
    llm_report_markdown TEXT,
    soul_keywords JSONB,          -- keyword cloud payload
    action_cards JSONB,           -- "3 things this week"

    -- Optional generated image URL/path (3:4 share card)
    share_image_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_results_dimension_scores_gin ON user_results USING GIN (dimension_scores);


-- 8) Optional audit events (security + growth analysis)
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES test_sessions(id) ON DELETE SET NULL,
    event_type VARCHAR(64) NOT NULL,
    event_payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_events_event_type ON audit_events(event_type);
CREATE INDEX idx_audit_events_created_at ON audit_events(created_at);
