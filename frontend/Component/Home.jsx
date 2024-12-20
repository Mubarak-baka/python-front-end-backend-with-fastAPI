import React from "react";
import { Link } from "react-router-dom";
import MenuItemsPage from "./MenuItemOrdersPage";
import OrdersPage from "./OrdersPage";


function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1 className="hero-title">Welcome to Gourmet Bliss</h1>
          <p className="hero-subtitle">Where every meal is a masterpiece</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">
              Explore Menu
            </Link>
            <Link to="/reservation" className="btn btn-secondary">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features">
        <h2>Discover Our Offerings</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="path/to/menu-image.jpg" alt="Menu" />
            <h3>Our Menu</h3>
            <p>Explore a variety of dishes curated by our chefs.</p>
            <Link to="/MenuItemsPage" className="btn btn-link">
              View Menu
            </Link>
          </div>
          <div className="card">
            <img src="path/to/reservation-image.jpg" alt="Reservations" />
            <h3>Book a Table</h3>
            <p>Reserve your spot for an unforgettable dining experience.</p>
            <Link to="/reservation" className="btn btn-link">
              Book Now
            </Link>
          </div>
          <div className="card">
            <img src="path/to/order-online-image.jpg" alt="Order Online" />
            <h3>Order Online</h3>
            <p>Enjoy your favorite meals delivered to your doorstep.</p>
            <Link to="/ordersPage" className="btn btn-link">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial">
            <p>"The food was amazing, and the service was impeccable!"</p>
            <span>- Alex J.</span>
          </div>
          <div className="testimonial">
            <p>"Best dining experience I've ever had. Highly recommend!"</p>
            <span>- Sarah W.</span>
          </div>
          <div className="testimonial">
            <p>"Fresh ingredients and exquisite flavors. Love it!"</p>
            <span>- Michael T.</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Gourmet Bliss. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
       
      </footer>
    </div>
  );
}

export default HomePage;
