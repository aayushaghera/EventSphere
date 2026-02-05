CREATE TABLE event_organizers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    organization_name VARCHAR(200) NOT NULL,
    organization_type VARCHAR(20) NOT NULL,
    website_url VARCHAR(255),
    business_license VARCHAR(100),
    experience_years INT DEFAULT 0,
    total_events_organized INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    verification_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
