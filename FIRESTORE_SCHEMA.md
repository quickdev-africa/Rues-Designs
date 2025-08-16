# Firestore Schema Documentation for Rues Design & Rental

## Collections & Fields

### users
- **profile**: { displayName, email, phone, photoURL, address }
- **preferences**: { theme, notifications, ... }
- **bookingHistory**: [bookingId]
- **admin**: boolean

### products
- **name**: string
- **description**: string
- **images**: [url]
- **pricing**: { base, perDay, deposit, ... }
- **availability**: [availabilityId]
- **categories**: [categoryId]
- **status**: string (active, archived, etc)

### categories
- **name**: string
- **description**: string
- **image**: url
- **productCount**: number

### bookings
- **user**: userId
- **items**: [{ productId, quantity, price }]
- **dates**: { start, end }
- **delivery**: { address, zone, fee, instructions }
- **payment**: { method, status, transactionId }
- **status**: string (pending, confirmed, cancelled, completed)
- **createdAt**: timestamp

### availability
- **productId**: productId
- **blocks**: [{ start, end, reason }]
- **maintenanceDates**: [date]

### reviews
- **rating**: number
- **comment**: string
- **user**: userId
- **product**: productId
- **date**: timestamp

### settings
- **businessHours**: { day, open, close }
- **deliveryZones**: [zone]
- **pricingRules**: { ... }

### analytics
- **page**: string
- **views**: number
- **product**: productId (optional)
- **conversion**: boolean
- **date**: timestamp

## Indexes
- See firestore.indexes.json for composite indexes on products, bookings, reviews, categories, availability, analytics.

## Validation & Security
- See firestore.rules for collection-specific access and validation rules.
- Only admins can write to products, categories, settings, analytics, and availability.
- Users can only read/write their own profile and bookings.
- Reviews can only be created/edited by the author or admin.
- All reads are public except bookings, user profiles, and analytics.
