CREATE TABLE event_reviews (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    attendee_id INT NOT NULL,
    overall_rating INT NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    venue_rating INT CHECK (venue_rating >= 1 AND venue_rating <= 5),
    organization_rating INT CHECK (organization_rating >= 1 AND organization_rating <= 5),
    value_for_money_rating INT CHECK (value_for_money_rating >= 1 AND value_for_money_rating <= 5),
    review_text TEXT,
    would_recommend BOOLEAN DEFAULT TRUE,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (attendee_id) REFERENCES attendees(id)
);
