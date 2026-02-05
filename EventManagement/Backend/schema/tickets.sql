CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    ticket_type_id INT NOT NULL,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    attendee_name VARCHAR(100) NOT NULL,
    attendee_email VARCHAR(100),
    attendee_phone VARCHAR(15),
    ticket_price DECIMAL(8,2) NOT NULL,
    check_in_status VARCHAR(20) DEFAULT 'not_checked_in',
    check_in_time TIMESTAMP NULL,
    qr_code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
);
