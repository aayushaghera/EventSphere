# Documentation

# 🎪 Event Management Platform

A comprehensive event management and ticketing platform built with **Node.js**, **React**, and **PostgreSQL**. This platform enables event organizers to create and manage events, venue owners to list their spaces, and attendees to discover and book tickets for amazing events.

## 📹 Video Demo

🎬 **[Watch Full Platform Demo](https://drive.google.com/file/d/1fqwfeY_LzJrr5Khgq3XCHI4TzVQma8QX/view?usp=sharing)**

Experience the complete walkthrough of our Event Management Platform, showcasing all key features including user registration, event creation, ticket booking, venue management, and analytics dashboard.

## 🌟 Features

### 👥 User Management
- **Role-based Authentication**: Admin, Event Organizer, Venue Owner, Attendee
- **Secure Registration**: Email validation, strong password requirements
- **Profile Management**: Customized profiles for each user type
- **JWT-based Authentication**: Secure token-based authentication

### 🎭 Event Management
- **Event Creation**: Comprehensive event setup with categories, descriptions, and media
- **Event Categories**: Conference, Concert, Workshop, Sports, Cultural, Networking
- **Event Lifecycle**: Draft → Published → Active → Completed
- **Age Restrictions**: All ages, 18+, 21+ events
- **Public/Private Events**: Control event visibility and access

### 🏢 Venue Management
- **Venue Registration**: Complete venue profiles with facilities and pricing
- **Venue Types**: Conference halls, auditoriums, stadiums, outdoor spaces, hotels
- **Availability Calendar**: Real-time booking management
- **Geographic Information**: Location-based venue discovery
- **Pricing Management**: Hourly rates and facility-based pricing

### 🎫 Ticketing System
- **Multiple Ticket Types**: General, VIP, Early Bird, Student, Group tickets
- **Dynamic Pricing**: Early bird discounts, group discounts, promotional codes
- **Secure Booking**: Complete booking workflow with payment simulation
- **Digital Tickets**: QR code generation for contactless entry
- **Booking Management**: View, modify, and cancel bookings

### 📊 Analytics & Reporting
- **Real-time Dashboard**: Sales trends, attendance metrics
- **Revenue Analytics**: Financial performance tracking
- **Attendee Demographics**: Age, location, preferences analysis
- **Event Performance**: Success metrics and ROI analysis
- **Marketing Analytics**: Campaign effectiveness tracking

### ✅ Check-in System
- **QR Code Scanning**: Quick and contactless check-in
- **Digital Verification**: Real-time ticket validation
- **Attendance Tracking**: Live attendee count and session tracking
- **Badge Generation**: On-site name badge printing

### 💰 Discount & Promotion System
- **Discount Codes**: Percentage and fixed amount discounts
- **Early Bird Pricing**: Time-sensitive promotional pricing
- **Group Discounts**: Bulk booking incentives
- **Loyalty Program**: Points-based rewards system

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Joi** - Data validation
- **QR Code** - Ticket generation
- **Multer** - File upload handling

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Query** - Server state management
- **Recharts** - Data visualization

### Database
- **PostgreSQL** - Relational database
- **10 Core Tables** - Users, Events, Venues, Tickets, Bookings, Reviews
- **Comprehensive Indexing** - Optimized queries
- **Foreign Key Constraints** - Data integrity

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eqpracticals/ddu-assignment-sep-2025-aayush-a.git
   cd EventManagement
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy environment variables
   cp .env
   
   # Configure your database connection in .env
   nano .env
   ```

3. **Database Setup**
   ```bash
   # Create database tables
   npm run setup-db
   
   # Seed demo data
   npm run seed-data
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend server
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api

## 🔧 Environment Configuration

### Backend (.env)
```env
# Database Configuration
DATABASE_URL=postgresql://neondb_owner:npg_brGY4vetTWl1@ep-restless-brook-ad90ni4e-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Event Management Platform
VITE_APP_VERSION=1.0.0
```

## 📊 Database Schema

### Core Tables
- **users** - System users with role-based access
- **event_organizers** - Organizer profiles and verification
- **attendees** - Attendee profiles and preferences
- **venues** - Venue listings and facility information
- **events** - Event details and lifecycle management
- **ticket_types** - Ticket categories and pricing
- **bookings** - Booking transactions and status
- **tickets** - Individual ticket instances
- **event_reviews** - Event ratings and feedback
- **discount_codes** - Promotional codes and campaigns

## 🔐 Demo Credentials

After running the seed script, you can login with these demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Admin** | admin@eventplatform.com | admin123 | Platform administrator |
| **Organizer** | organizer@events.com | organizer123 | Event organizer |
| **Venue Owner** | venue@grandcenter.com | venue123 | Venue owner |
| **Attendee** | attendee1@gmail.com | attendee123 | Event attendee |

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Events
- `GET /api/events` - List events with filters
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (Organizer)
- `PUT /api/events/:id` - Update event (Organizer)
- `DELETE /api/events/:id` - Delete event (Organizer/Admin)

### Venues
- `GET /api/venues` - List venues with filters
- `GET /api/venues/:id` - Get venue details
- `POST /api/venues` - Register venue (Venue Owner)
- `PUT /api/venues/:id` - Update venue (Venue Owner)

### Tickets & Bookings
- `GET /api/events/:id/ticket-types` - Get ticket types
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/tickets/:id/check-in` - Check-in ticket

### Analytics
- `GET /api/analytics/dashboard` - Analytics dashboard
- `GET /api/analytics/sales-trends` - Sales analytics
- `GET /api/analytics/attendee-demographics` - Attendee analytics

## 📱 User Interfaces

### 🎯 Event Organizer Dashboard
- Event creation and management
- Ticket sales analytics
- Attendee management
- Revenue tracking
- Marketing tools

### 🏢 Venue Owner Portal
- Venue profile management
- Booking calendar
- Revenue analytics
- Facility management

### 👥 Attendee Portal
- Event discovery and search
- Ticket booking workflow
- Digital ticket access
- Event history and reviews

### ⚙️ Admin Panel
- Platform overview
- User management
- Event moderation
- System analytics

## 🎨 Design Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean and intuitive interface
- **Dark/Light Mode** - Theme switching
- **Accessibility** - WCAG 2.1 compliant
- **Progressive Web App** - Offline capabilities

## 🔒 Security Features

- **Password Security** - bcrypt hashing with salt
- **JWT Tokens** - Secure authentication
- **Rate Limiting** - API protection
- **Input Validation** - Comprehensive data validation
- **CORS Protection** - Cross-origin request security
- **SQL Injection Prevention** - Parameterized queries

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📸 Screenshots

### attendees
<img width="1919" height="972" alt="Screenshot 2025-09-22 011036" src="https://github.com/user-attachments/assets/55ed9798-b684-4c0d-b12d-406b74c6157b" />


### Booking 
<img width="1919" height="964" alt="Screenshot 2025-09-22 010445" src="https://github.com/user-attachments/assets/7e3dc48e-9b53-4e2b-8ec3-43f4d02480e1" />

<img width="1919" height="967" alt="Screenshot 2025-09-22 011323" src="https://github.com/user-attachments/assets/5f646826-3ab8-43e4-a579-c4517dc60d35" />

### event_organization
<img width="1919" height="969" alt="Screenshot 2025-09-22 012744" src="https://github.com/user-attachments/assets/8366bc57-0dc1-40ee-b5f1-7ef3a1ff8ec9" />

<img width="1919" height="975" alt="Screenshot 2025-09-22 012800" src="https://github.com/user-attachments/assets/c21da8f0-b86d-4655-8d87-fb12f3aa815e" />

### events
<img width="1915" height="969" alt="Screenshot 2025-09-22 013113" src="https://github.com/user-attachments/assets/4806bb08-740e-4db8-8265-09e5906ff228" />

<img width="1906" height="967" alt="Screenshot 2025-09-22 013141" src="https://github.com/user-attachments/assets/cc2b59d6-ed76-45c2-b5c6-cf9aa6bd088b" />

<img width="1919" height="975" alt="Screenshot 2025-09-22 013158" src="https://github.com/user-attachments/assets/88d442e2-7157-4f7f-ba29-25184b1e0ca4" />


### user
<img width="1917" height="976" alt="Screenshot 2025-09-22 013310" src="https://github.com/user-attachments/assets/3d3e44b0-50cf-4b96-943f-16228f12f739" />


### venue
<img width="1915" height="969" alt="Screenshot 2025-09-22 013357" src="https://github.com/user-attachments/assets/5e9706a9-587b-4125-9726-ac15feef17d5" />

<img width="1919" height="976" alt="Screenshot 2025-09-22 013409" src="https://github.com/user-attachments/assets/952b8a08-435e-43eb-800d-d1aa4c4f9b17" />


<img width="1919" height="974" alt="Screenshot 2025-09-22 013423" src="https://github.com/user-attachments/assets/0c4f561e-5c43-4034-95de-0f4c1f0eab60" />


---

<br>
<br>
<br>



# 🎬 Event Management Platform - Take-Home Assessment

## 📋 Project Overview

Welcome to your 3-day coding challenge! 🚀 

You'll build a **comprehensive event management and ticketing platform** with event creation, venue booking, ticket sales, attendee management, and event analytics. This project will test your skills in frontend development, backend APIs, database design, security implementation, and event business workflow management.

### 🎯 What You'll Build
- ✅ Event creation with detailed information and scheduling
- ✅ Venue management and booking system
- ✅ Ticket booking with multiple ticket types
- ✅ Payment processing and ticket generation
- ✅ Attendee check-in and management system
- ✅ Event promotion and marketing tools
- ✅ Real-time event analytics and reporting
- ✅ Feedback and rating system

---

## 🛠️ Technology Guidelines

### 💡 **Your Choice - Show Your Expertise!**

**Frontend:** 
- React.js / Vue.js / Angular / Next.js / Nuxt.js ⚛️
- Or any modern JavaScript framework you're comfortable with
- **Suggestion:** Use what you know best - we want to see clean, maintainable code!

**Backend:** 
- Node.js (Express/Fastify) / Python (Django/Flask) / PHP (Laravel) 🔧
- **Suggestion:** Choose based on your strongest skills

**Database:** 
- PostgreSQL / MySQL / SQLite / SQL Server 🗄️
- **Must be relational** - NoSQL not accepted for this project
- **Tip:** SQLite is fine for development, but document production database choice

---

## 📚 Functional Modules & Detailed Tasks

### 1. 👥 User Management System

#### Registration System 📝
**What to implement:**
- **Email Validation:** ✉️
  - Check valid email format using regex
  - Block disposable email services (10minutemail, tempmail, etc.)
  - **Tip:** Use a library like `validator.js` or create a blacklist
  
- **Password Security:** 🔒
  - Minimum 8 characters
  - Must include: uppercase, lowercase, digit, special character
  - Block common passwords (password123, admin, etc.)
  - **Implementation hint:** Use libraries like `joi` or `yup` for validation

- **Role-based Registration:** 👥
  - **Event Organizers:** Create and manage events
  - **Venue Owners:** Manage venues and availability
  - **Attendees:** Book tickets and attend events
  - **Admin:** System management and oversight

#### Event Organizer Profile Management 🎪
**Required Fields & Validation:**

| Field | Rules | Error Messages |
|-------|-------|----------------|
| Organization Name 🏢 | Non-empty, 3-200 chars | "Organization name must be 3-200 characters" |
| Contact Person 👤 | Non-empty, 2-100 chars, letters only | "Contact person name required" |
| Phone Number ☎️ | Valid format, 10 digits | "Please enter a valid 10-digit phone number" |
| Website URL 🌐 | Valid URL format (optional) | "Please enter a valid website URL" |
| Organization Type 🎯 | Corporate, Non-profit, Individual, Government | "Please select organization type" |
| Experience Years 📅 | 0-50 years | "Please enter valid experience years" |
| Business License 📜 | License number for verification | "Business license number required" |

#### Attendee Profile Management 👨‍👩‍👧‍👦
**Attendee Information:**
- **Personal Details:** Name, phone, email, date of birth
- **Preferences:** Event types of interest, notification preferences
- **Booking History:** Past event attendance and tickets
- **Payment Methods:** Saved payment options for quick booking
- **Emergency Contact:** Emergency contact information

---

### 2. 🎪 Event Management System

#### Event Creation & Configuration 📋
**Required Event Fields & Validation:**

| Field | Rules | Error Messages |
|-------|-------|----------------|
| Event Title 📝 | Non-empty, 10-200 chars | "Event title must be 10-200 characters" |
| Event Category 🏷️ | Conference, Concert, Workshop, Sports, Cultural | "Please select event category" |
| Description 📄 | Non-empty, max 2000 chars | "Description required (max 2000 characters)" |
| Start Date & Time 📅 | Future date/time | "Event must be scheduled for future date" |
| End Date & Time ⏰ | After start date/time | "End time must be after start time" |
| Venue 🏢 | Must select from available venues | "Please select a valid venue" |
| Event Capacity 👥 | Positive number, max 50,000 | "Capacity must be positive and ≤ 50,000" |
| Event Type 🎭 | Public, Private, Invite-only | "Please select event type" |
| Age Restriction 🔞 | All ages, 18+, 21+ | "Please select age restriction" |

#### Event Categories & Types 🏷️
**Event Categories:**
- **Conferences:** Business, Technology, Academic
- **Entertainment:** Concerts, Theater, Comedy Shows
- **Sports:** Tournaments, Matches, Marathons
- **Workshops:** Training, Educational, Skill Development
- **Cultural:** Festivals, Art Shows, Cultural Programs
- **Networking:** Meetups, Business Events, Social Gatherings

#### Event Media Management 📸
**Media Features:**
- **Event Banner:** Main promotional image (max 5MB)
- **Event Gallery:** Multiple event photos (up to 10 images)
- **Event Video:** Promotional video link (YouTube/Vimeo)
- **Event Logo:** Organization/event logo
- **Marketing Materials:** Downloadable brochures, schedules

---

### 3. 🏢 Venue Management System

#### Venue Registration & Setup 🏛️
**Venue Information:**

| Field | Rules | Notes |
|-------|-------|-------|
| Venue Name 🏢 | Required, 3-200 chars | Unique venue identifier |
| Address 📍 | Complete address required | Full location details |
| City & State 🌆 | Valid city and state | Geographic information |
| Venue Type 🎭 | Conference Hall, Auditorium, Stadium, Outdoor | Facility type |
| Capacity 👥 | Maximum attendees | Venue size limitation |
| Facilities 🛠️ | Parking, WiFi, A/C, Sound System | Available amenities |
| Hourly Rate 💰 | Rental cost per hour | Pricing information |
| Contact Person 👤 | Venue manager details | Primary contact |

#### Venue Availability Management 📅
**Availability Features:**
- **Calendar Management:** Available dates and time slots
- **Booking Conflicts:** Prevent double bookings
- **Maintenance Schedules:** Blocked dates for maintenance
- **Pricing Variations:** Peak hour/season pricing
- **Advance Booking:** How far in advance bookings are accepted

---

### 4. 🎟️ Ticketing System

#### Ticket Type Configuration 🎫
**Ticket Categories:**
- **General Admission:** Standard entry tickets
- **VIP Tickets:** Premium access with additional benefits
- **Early Bird:** Discounted tickets for early bookings
- **Group Tickets:** Bulk bookings with group discounts
- **Student/Senior:** Discounted tickets for specific demographics
- **Complimentary:** Free tickets for sponsors/media

#### Ticket Booking Process 🛒
**Booking Workflow:**
1. **Browse Events** by category, date, location
2. **Select Event** and view event details
3. **Choose Ticket Type** and quantity
4. **Enter Attendee Details** for each ticket
5. **Apply Discount Codes** if available
6. **Review Order** and total cost
7. **Process Payment** and generate tickets
8. **Email Confirmation** with ticket details

#### Pricing & Discount Management 💰
**Pricing Structure:**
```javascript
// Example pricing calculation
function calculateTicketPrice(ticketType, quantity, discountCode, bookingDate) {
  let basePrice = ticketType.price;
  let totalPrice = basePrice * quantity;
  
  // Early bird discount
  if (isEarlyBird(bookingDate, ticketType.earlyBirdDeadline)) {
    totalPrice *= (1 - ticketType.earlyBirdDiscount);
  }
  
  // Group discount
  if (quantity >= ticketType.groupMinimum) {
    totalPrice *= (1 - ticketType.groupDiscount);
  }
  
  // Promo code discount
  if (discountCode && isValidCode(discountCode)) {
    totalPrice *= (1 - discountCode.discountPercent);
  }
  
  return {
    basePrice: basePrice * quantity,
    discountAmount: (basePrice * quantity) - totalPrice,
    finalPrice: totalPrice
  };
}
```

---

### 5. 📊 Event Analytics & Reporting

#### Real-time Event Metrics 📈
**Key Performance Indicators:**
- **Ticket Sales:** Total tickets sold vs available
- **Revenue Tracking:** Real-time sales revenue
- **Registration Trends:** Daily registration patterns
- **Attendee Demographics:** Age, location, preferences analysis
- **Marketing Performance:** Source of ticket sales

#### Sales Analytics 📉
**Revenue Reports:**
1. **Daily Sales Chart:** Ticket sales over time
2. **Ticket Type Performance:** Which tickets sell best
3. **Revenue Breakdown:** Revenue by ticket category
4. **Geographic Distribution:** Attendee location mapping
5. **Marketing ROI:** Campaign effectiveness analysis

#### Attendee Analytics 📋
**Attendee Insights:**
- **Check-in Rates:** Actual attendance vs ticket sales
- **Engagement Metrics:** Session attendance, feedback scores
- **Repeat Attendees:** Loyalty and retention tracking
- **Satisfaction Scores:** Post-event feedback analysis
- **Network Analysis:** Attendee interaction patterns

---

### 6. ✅ Check-in & Attendee Management

#### Digital Check-in System 📱
**Check-in Features:**
- **QR Code Scanning:** Quick ticket verification
- **Manual Check-in:** Search by name/email/ticket number
- **Badge Printing:** On-site name badge generation
- **Session Tracking:** Track session attendance
- **Real-time Counts:** Live attendee count updates

#### Attendee Management Tools 👥
**Management Features:**
- **Attendee Database:** Complete attendee information
- **Communication Tools:** Mass email/SMS to attendees
- **Special Requirements:** Dietary, accessibility needs
- **VIP Management:** Special handling for VIP attendees
- **Emergency Contacts:** Emergency contact management

---

### 7. 📧 Event Marketing & Communication

#### Marketing Campaign Management 📢
**Promotion Tools:**
- **Email Marketing:** Automated email campaigns
- **Social Media Integration:** Share event on social platforms
- **Discount Campaigns:** Promotional codes and offers
- **Affiliate Program:** Partner referral system
- **Event Listings:** Submit to event directories

#### Communication System 💬
**Attendee Communication:**
- **Registration Confirmations:** Immediate booking confirmations
- **Event Reminders:** Automated reminder emails/SMS
- **Event Updates:** Important announcements and changes
- **Post-event Follow-up:** Thank you messages and feedback requests
- **Emergency Notifications:** Critical updates and alerts

---

### 8. 🗄️ Database Design

**⚠️ Use Exactly This Schema - Points Will Be Deducted for Deviations**

#### Users Table 👥
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_type ENUM('organizer', 'venue_owner', 'attendee', 'admin') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Event Organizers Table 🎪
```sql
CREATE TABLE event_organizers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    organization_name VARCHAR(200) NOT NULL,
    organization_type ENUM('corporate', 'non_profit', 'individual', 'government') NOT NULL,
    website_url VARCHAR(255),
    business_license VARCHAR(100),
    experience_years INT DEFAULT 0,
    total_events_organized INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Attendees Table 👨‍👩‍👧‍👦
```sql
CREATE TABLE attendees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    date_of_birth DATE,
    preferred_event_types TEXT, -- JSON array of preferred categories
    total_events_attended INT DEFAULT 0,
    loyalty_points INT DEFAULT 0,
    notification_preferences JSON, -- Email, SMS preferences
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Venues Table 🏢
```sql
CREATE TABLE venues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    venue_name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    venue_type ENUM('conference_hall', 'auditorium', 'stadium', 'outdoor', 'hotel', 'community_center') NOT NULL,
    capacity INT NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    facilities JSON, -- Parking, WiFi, A/C, etc.
    description TEXT,
    contact_person VARCHAR(100),
    contact_phone VARCHAR(15),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

#### Events Table 🎭
```sql
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_id INT NOT NULL,
    venue_id INT NOT NULL,
    event_title VARCHAR(200) NOT NULL,
    event_category ENUM('conference', 'concert', 'workshop', 'sports', 'cultural', 'networking') NOT NULL,
    description TEXT NOT NULL,
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    event_type ENUM('public', 'private', 'invite_only') DEFAULT 'public',
    event_capacity INT NOT NULL,
    age_restriction ENUM('all_ages', '18_plus', '21_plus') DEFAULT 'all_ages',
    registration_start_date DATETIME,
    registration_end_date DATETIME,
    event_status ENUM('draft', 'published', 'active', 'completed', 'cancelled') DEFAULT 'draft',
    banner_image_url VARCHAR(255),
    total_tickets_sold INT DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES event_organizers(id),
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);
```

#### Ticket Types Table 🎫
```sql
CREATE TABLE ticket_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    ticket_name VARCHAR(100) NOT NULL, -- General, VIP, Early Bird
    description TEXT,
    price DECIMAL(8,2) NOT NULL,
    quantity_available INT NOT NULL,
    quantity_sold INT DEFAULT 0,
    sale_start_datetime DATETIME,
    sale_end_datetime DATETIME,
    early_bird_deadline DATETIME,
    early_bird_discount DECIMAL(5,2) DEFAULT 0.00, -- Percentage
    group_minimum INT DEFAULT 10,
    group_discount DECIMAL(5,2) DEFAULT 0.00, -- Percentage
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
```

#### Bookings Table 🛒
```sql
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id VARCHAR(20) UNIQUE NOT NULL, -- BKG2024001
    event_id INT NOT NULL,
    attendee_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_tickets INT NOT NULL,
    subtotal_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(8,2) DEFAULT 0.00,
    tax_amount DECIMAL(8,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_status ENUM('pending', 'confirmed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    discount_code VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (attendee_id) REFERENCES attendees(id)
);
```

#### Tickets Table 🎟️
```sql
CREATE TABLE tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    ticket_type_id INT NOT NULL,
    ticket_number VARCHAR(20) UNIQUE NOT NULL, -- TKT2024001
    attendee_name VARCHAR(100) NOT NULL,
    attendee_email VARCHAR(100),
    attendee_phone VARCHAR(15),
    ticket_price DECIMAL(8,2) NOT NULL,
    check_in_status ENUM('not_checked_in', 'checked_in', 'no_show') DEFAULT 'not_checked_in',
    check_in_time TIMESTAMP NULL,
    qr_code VARCHAR(255), -- QR code for check-in
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id)
);
```

#### Event Reviews Table ⭐
```sql
CREATE TABLE event_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
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
```

#### Discount Codes Table 💰
```sql
CREATE TABLE discount_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    discount_type ENUM('percentage', 'fixed_amount') NOT NULL,
    discount_value DECIMAL(8,2) NOT NULL,
    minimum_tickets INT DEFAULT 1,
    usage_limit INT,
    used_count INT DEFAULT 0,
    valid_from DATETIME,
    valid_until DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_code (event_id, code)
);
```

**🔧 Database Setup Instructions:**
1. Create database: `event_management`
2. Run migration scripts in order
3. **Seed data:** Insert sample venues, events, and admin user
4. **Indexes:** Add indexes on frequently queried columns

**📦 Sample Seed Data:**
```sql
-- Insert admin user
INSERT INTO users (user_type, email, password_hash, full_name, is_active) VALUES
('admin', 'admin@eventplatform.com', '$2b$12$hashed_password_here', 'Event Platform Administrator', TRUE);

-- Insert sample venues
INSERT INTO venues (owner_id, venue_name, address, city, state, venue_type, capacity, hourly_rate, contact_person, contact_phone) VALUES
(1, 'Grand Convention Center', 'Satellite Road, Ahmedabad', 'Ahmedabad', 'Gujarat', 'conference_hall', 500, 5000.00, 'Venue Manager', '9876543210'),
(1, 'City Auditorium', 'CG Road, Ahmedabad', 'Ahmedabad', 'Gujarat', 'auditorium', 1000, 8000.00, 'Facility Manager', '9876543211');

-- Insert sample organizer
INSERT INTO users (user_type, email, password_hash, full_name, phone, is_active) VALUES
('organizer', 'organizer@events.com', '$2b$12$hashed_password_here', 'Event Organizer', '9876543212', TRUE);

INSERT INTO event_organizers (user_id, organization_name, organization_type, experience_years) VALUES
(2, 'Premium Events Ltd', 'corporate', 5);

-- Insert sample events
INSERT INTO events (organizer_id, venue_id, event_title, event_category, description, start_datetime, end_datetime, event_capacity) VALUES
(1, 1, 'Tech Conference 2024', 'conference', 'Annual technology conference featuring latest innovations', '2024-12-15 09:00:00', '2024-12-15 18:00:00', 300),
(1, 2, 'Cultural Festival', 'cultural', 'Celebration of local arts and culture', '2024-12-20 16:00:00', '2024-12-20 22:00:00', 800);
```

---

### 9. 🎨 UI/UX Requirements

#### Responsive Design 📱
- **Mobile-first approach** for attendee ticket booking
- **Event-themed design** with vibrant, engaging colors
- **High-quality event photography** displays
- **Quick booking flows** for mobile users

#### Role-based Interfaces 👥
**Event Organizer Dashboard:**
- **Event Management:** Create, edit, and manage events
- **Ticket Sales Analytics:** Real-time sales data and trends
- **Attendee Management:** Registration lists and check-in status
- **Marketing Tools:** Promotion campaigns and discount codes
- **Revenue Reports:** Financial performance and payouts

**Venue Owner Portal:**
- **Venue Management:** Venue details, photos, and amenities
- **Booking Calendar:** Availability and booking requests
- **Booking Analytics:** Venue utilization and revenue
- **Facility Management:** Maintenance schedules and updates
- **Client Communication:** Messages from event organizers

**Attendee Portal:**
- **Event Discovery:** Browse and search events by category/location
- **Ticket Booking:** Simple booking flow with payment
- **My Tickets:** Digital tickets and QR codes
- **Event History:** Past events and upcoming bookings
- **Reviews & Ratings:** Provide feedback on attended events

**Admin Dashboard:**
- **Platform Overview:** Total events, users, and transactions
- **User Management:** Organizer verification and user accounts
- **Event Moderation:** Approve/reject event listings
- **Analytics Reports:** Platform performance and growth metrics
- **System Configuration:** Categories, settings, and policies

---

### 10. 🔌 Backend API Design

#### Required Endpoints 📡

**Authentication:**
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/profile
PUT /api/auth/profile
```

**Event Management:**
```
GET /api/events?category=conference&city=Ahmedabad&date=2024-12-15
GET /api/events/:id
POST /api/events (Organizer only)
PUT /api/events/:id (Organizer only)
DELETE /api/events/:id (Organizer/Admin only)
GET /api/events/:id/analytics (Organizer only)
```

**Ticket Management:**
```
GET /api/events/:eventId/ticket-types
POST /api/bookings
GET /api/bookings/:id
PUT /api/bookings/:id/cancel
GET /api/tickets/:ticketNumber
PUT /api/tickets/:id/check-in
```

**Venue Management:**
```
GET /api/venues?city=Ahmedabad&capacity=500
GET /api/venues/:id
POST /api/venues (Venue Owner only)
PUT /api/venues/:id (Venue Owner only)
GET /api/venues/:id/availability
```

**Analytics:**
```
GET /api/analytics/dashboard
GET /api/analytics/sales-trends
GET /api/analytics/popular-events
GET /api/analytics/attendee-demographics
```

---

### 11. 📦 Deliverables Checklist

#### Code Submission 💻
- [ ] **Complete source code** with clear structure
- [ ] **Database schema** and seed scripts
- [ ] **Environment configuration** files
- [ ] **Git repository** with meaningful commits

#### Documentation 📚
- [ ] **README.md** with setup instructions
- [ ] **API documentation**
- [ ] **User guide** for different roles

#### Demo Video 🎥
**3-5 minute video showing:**
- [ ] **Event creation and management**
- [ ] **Ticket booking workflow**
- [ ] **Venue management features**
- [ ] **Attendee check-in process**
- [ ] **Analytics and reporting dashboard**
- [ ] **Mobile responsiveness**

---

## 🎯 Evaluation Criteria

### Technical Implementation (40%)
- **Code quality and organization** (10%)
- **Database design and queries** (10%)
- **API design and functionality** (10%)
- **Frontend functionality and UX** (10%)

### Security & Validation (25%)
- **Input validation** (10%)
- **Authentication and authorization** (8%)
- **Security best practices** (7%)

### Feature Completeness (20%)
- **Core event management features implemented** (15%)
- **Advanced features** (5%)

### Documentation & Presentation (15%)
- **Documentation quality** (8%)
- **Demo video** (4%)
- **Design decisions** (3%)

---

## 🚀 Bonus Points Opportunities

**Extra Credit Features:**
- [ ] **QR Code Integration** (+10 points)
  - Generate QR codes for tickets
  - Mobile QR code scanning for check-in
  - Contactless entry management

- [ ] **Real-time Updates** (+12 points)
  - Live ticket availability updates
  - Real-time attendee count
  - WebSocket integration for live data

- [ ] **Advanced Analytics** (+8 points)
  - Predictive attendance modeling
  - Revenue forecasting
  - Marketing campaign effectiveness

- [ ] **Mobile App Features** (+15 points)
  - React Native or Flutter app
  - Push notifications for event updates
  - Offline ticket access

---

## ❓ Frequently Asked Questions

**Q: How complex should the ticket booking system be?**
A: Focus on basic ticket types, quantity selection, and payment processing. Advanced features like seat selection earn bonus points.

**Q: Should I implement real payment processing?**
A: No, simulate payment processing with status updates. Focus on the booking workflow and pricing logic.

**Q: How detailed should the analytics be?**
A: Basic charts showing ticket sales, revenue trends, and attendee counts. Advanced analytics are bonus features.

**Q: Do I need real-time features?**
A: Console logging is fine for development. Real-time features with WebSockets earn bonus points.

---

## 🎉 Good Luck!

Focus on building a **functional event management platform** that handles core event operations. We're looking for:

- **Clean code** with proper event logic 🧹
- **Intuitive interfaces** for organizers and attendees 💡
- **Basic security** for payment and user data 🔐
- **Working event workflows** 🧩
- **Professional presentation** 👀

**Build something event organizers would actually use!** 🌟

---

*Assessment prepared by [eQuest Solutions](https://equestsolutions.net)*

*Last updated: September 2025*
