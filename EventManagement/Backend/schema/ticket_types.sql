CREATE TABLE ticket_types (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    ticket_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(8,2) NOT NULL,
    quantity_available INT NOT NULL,
    quantity_sold INT DEFAULT 0,
    sale_start_datetime TIMESTAMP,
    sale_end_datetime TIMESTAMP,
    early_bird_deadline TIMESTAMP,
    early_bird_discount DECIMAL(5,2) DEFAULT 0.00,
    group_minimum INT DEFAULT 10,
    group_discount DECIMAL(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
