-- Extended user profiles table for additional profile information
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    company VARCHAR(100),
    job_title VARCHAR(100),
    location VARCHAR(100),
    website VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(100),
    dietary_restrictions TEXT[], -- Array of dietary restrictions
    accessibility_needs TEXT[], -- Array of accessibility needs
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    emergency_contact_relationship VARCHAR(50),
    profile_image_url VARCHAR(500),
    date_of_birth DATE,
    preferred_communication VARCHAR(20) DEFAULT 'email', -- email, sms, both
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    marketing_consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- Insert trigger to automatically create a profile when a user is created
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_profile_trigger
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_profile();