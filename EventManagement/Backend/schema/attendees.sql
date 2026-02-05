CREATE TABLE IF NOT EXISTS attendees (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date_of_birth DATE,
    preferred_event_types TEXT,
    total_events_attended INT DEFAULT 0,
    loyalty_points INT DEFAULT 0,
    notification_preferences JSON,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
