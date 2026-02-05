CREATE TABLE discount_codes (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    discount_type VARCHAR(20) NOT NULL,
    discount_value DECIMAL(8,2) NOT NULL,
    minimum_tickets INT DEFAULT 1,
    usage_limit INT,
    used_count INT DEFAULT 0,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE (event_id, code)
);
