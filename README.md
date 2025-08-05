Here is the README file for the "Hyperlocal Delivery Service API & Dashboard" GitHub repository:

# Hyperlocal Delivery Service API & Dashboard

This is a complete full-stack application that simulates a real-world hyperlocal delivery service. The project includes a robust backend API built with Node.js and Express, powered by a PostgreSQL database with PostGIS for advanced geospatial queries. It also features a clean, interactive frontend dashboard for visualizing and managing orders.
<img width="1919" height="918" alt="Screenshot 2025-08-05 132517" src="https://github.com/user-attachments/assets/a2aef9c6-b059-4a98-b460-7ed382c9d3cb" />

## Key Features

- **Full CRUD for Core Entities**: Manage Stores, Products, Customers, Orders, and Delivery Personnel.
- **Hyperlocal Search**: Find nearby stores within a given radius using efficient geospatial queries.
- **Complex Order Processing**: Handle orders with multiple items using secure database transactions to ensure data integrity.
- **Automated Delivery Assignment**: Intelligently find and assign the closest available delivery driver to a new order.
- **Full Order Lifecycle Management**: Update and track an order's status from pending → preparing → out_for_delivery → delivered.
- **Interactive Frontend**: A simple, clean dashboard built with HTML, Tailwind CSS, and JavaScript to view and manage live orders.

## Technology Stack

- **Backend Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Geospatial Extension**: PostGIS
- **Key Libraries**: `pg` (PostgreSQL Client), `dotenv`, `cors`
- **Frontend Structure**: HTML5
- **Styling**: Tailwind CSS
- **Interactivity**: Vanilla JavaScript (ES6+)
- **API Communication**: fetch API

## System Architecture

The project follows a standard and scalable client-server architecture with a clear separation of concerns using the Model-View-Controller (MVC) pattern, extended with a Service layer for complex business logic.

- `public/`: Contains all static frontend assets, including index.html.
- `config/`: Handles the database connection setup.
- `models/`: The data access layer. Each model is responsible for all SQL queries for a specific database table.
- `controllers/`: Handles incoming API requests, validates data, and calls the appropriate models or services.
- `routes/`: Defines all the API endpoints and maps them to the correct controller functions.
- `services/`: Contains complex business logic that involves multiple models (e.g., deliveryAssignmentService.js).

## Setup and Installation

To run this project locally, follow these steps:

**Prerequisites:**
- Node.js installed
- PostgreSQL installed (with PostGIS extension enabled)
- Git installed

**Clone the repository:**
```bash
git clone https://github.com/Abhishek-math16/hyperlocal-delivery-service.git
cd hyperlocal-delivery-service
```

**Install backend dependencies:**
```bash
npm install
```

**Set up the database:**
1. Create a new PostgreSQL database named `hyperlocal_delivery`.
2. Connect to it and run:
   ```
   CREATE EXTENSION postgis;
   ```
3. Run the database.sql file (or the individual CREATE TABLE commands from this guide) to set up all the necessary tables.

**Configure Environment Variables:**
1. Create a `.env` file in the project root.
2. Copy the contents of `.env.example` (if provided) or add the following variables, replacing the values with your local database credentials:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=hyperlocal_delivery
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=3000
   ```

**Run the server:**
```bash
npm run dev
```

- The server will start on http://localhost:3000.

**View the application:**
- Open your web browser and navigate to http://localhost:3000.

## API Endpoints

A `test.http` file is included in the repository for easy testing with the VS Code REST Client extension.

### Stores
- `POST /api/stores`: Create a new store.
- `GET /api/stores/nearby`: Find nearby stores.
- `GET /api/stores/:id`: Get a store by its ID.

### Products
- `POST /api/stores/:storeId/products`: Add a product to a specific store.
- `GET /api/stores/:storeId/products`: Get all products from a specific store.

### Customers
- `POST /api/customers`: Create a new customer.
- `GET /api/customers/:id`: Get a customer by their ID.

### Delivery Personnel
- `POST /api/delivery`: Create a new delivery person.
- `PUT /api/delivery/:id`: Update a driver's location and status.

### Orders
- `POST /api/orders`: Create a new complex order with multiple items.
- `GET /api/orders`: Get a list of all orders.
- `POST /api/orders/:orderId/assign-delivery`: Assign the closest available driver to an order.
- `PATCH /api/orders/:orderId/status`: Update an order's status.

### References

1. **GitHub Login (Requires Access)**
   - [GitHub Login](https://github.com/login?client_id=0120e057bd645470c1ed&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D0120e057bd645470c1ed%26code_challenge%3DyD1ZuByz3N9RNknDu70wZs1mrvFhssO_mODo0jlQ0fg%26code_challenge_method%3DS256%26redirect_uri%3Dhttp%253A%252F%252F127.0.0.1%253A57945%252F%26response_type%3Dcode%26scope%3Drepo%2Bgist%2Bworkflow%26state%3Dfd449bfd183444cfb60cc1fd09c22e84)

2. **Guides and Articles**
   - [Ultimate Guide to Hyperlocal Delivery App Development (Promatics India)](https://www.promaticsindia.com/blog/the-ultimate-guide-to-hyperlocal-delivery-app-development)
   - [Hyperlocal Project - GitHub Repo](https://github.com/khu5h1/hyperlocal-project)
   - [Trending Hyperlocal Topics on GitHub](https://github.com/topics/hyperlocal?o=desc&s=stars)
   - [Step-By-Step Guide to Starting a Hyperlocal Delivery Business (LinkedIn)](https://www.linkedin.com/pulse/step-by-step-guide-develop-start-hyperlocal-delivery-business-jsgpf)
   - [Hyperlocal Delivery App Blog (Webkul)](https://webkul.com/blog/hyperlocal-delivery-app/)
   - [Hyperlocal Delivery Service App with Flutter (Academia.edu)](https://www.academia.edu/86496521/Hyperlocal_Delivery_Service_Application_Development_using_Flutter)
   - [Ultimate Guide to Hyperlocal App Development (DevTechnosys)](https://devtechnosys.com/insights/hyperlocal-app-development/)
   - [How to Build Hyperlocal Delivery Apps (SlideServe, PPT)](https://www.slideserve.com/venkatprasad/ultimate-guide-on-how-to-build-hyper-local-delivery-apps-google-docs-powerpoint-ppt-presentation)
   - [Guide to Hyperlocal Delivery Mobile Apps (Techugo)](https://www.techugo.com/blog/a-guide-to-make-your-own-hyperlocal-delivery-mobile-app/)
   - [Package Delivery Hyperlocal App Design Process (Behance)](https://www.behance.net/gallery/102655195/Package-Delivery-Hyperlocal-Mobile-App-Design-Process)
