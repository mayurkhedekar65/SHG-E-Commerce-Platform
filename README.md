# Self-Help-Group (SHG) E‑Commerce Platform

## Project Overview

The **Self‑Help‑Group (SHG) E‑Commerce Platform** is a full‑stack web application built to digitally empower Self Help Groups by enabling them to sell products online and manage orders efficiently.

The platform provides a smooth shopping experience for customers while giving **Group Admins** a dedicated management panel to control products, orders, and deliveries. Secure authentication using **JWT tokens**, online payments, **Cash on Delivery (COD)**, and automated email notifications are fully integrated.


---

## Features

###  User Features

* Secure user authentication using **JWT tokens**
* Browse products listed by SHGs
* Add products to cart and place orders
* Online payment and **Cash on Delivery (COD)** options
* View order status (Pending / Approved / Shipped / Delivered)
* Update user profile details
* Receive automatic email notifications for order updates

###  Group Admin Features

* Dedicated **Admin Panel** for SHG management
* View all orders placed by customers
* **Approve or Reject** purchase requests
* Mark orders as **Shipped** or **Delivered**
* Automatic email notifications sent to customers on status change
* Manage products and inventory

---

## Tech Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Django (Django REST Framework)

### Authentication

* JWT (JSON Web Tokens)

### Database

* MySQL

### Payments & Communication

* Online Payment Gateway
* Cash on Delivery (COD)
* Automated Email Notifications

---

## Installation

### 1. Clone the Repository

```bash
git clone <https://github.com/Abhiraj05/Self-Help-Group.git>
```

---

## 2. Backend Setup (Django)

### 1. Create & Activate Virtual Environment

```bash
cd backend
python -m venv env

# Windows
env\Scripts\activate

# macOS / Linux
source env/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
SECRET_KEY=your_secret_key
DEBUG=True
DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password
```

### 4. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

### 6. Run Backend Server

```bash
python manage.py runserver
```

---

## 3. Frontend Setup (React)

### 1. Navigate to Frontend Folder

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

---

## Screenshots

###  User Registration / Login

*(Signup & Signin interface with JWT authentication)*

###  Product Listing & Ordering

*(Customers can browse products and place orders)*

###  Payment Options

*(Online payment and Cash on Delivery supported)*

###  Order Management (Admin Panel)

*(Group Admin can approve/reject, ship, and deliver orders)*

###  Email Notifications

*(Automatic emails sent on order approval, shipping, and delivery)*

---

