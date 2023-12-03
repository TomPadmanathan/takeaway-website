# Takeaway Website (Work in Progress)

This repository contains a work-in-progress takeaway website built using TypeScript, Next.js, MySQL Tailwind CSS. This web application is designed to provide users with a simple way to place orders from a restuant.

## View a Live Build

You can explore the current version of this project by visiting the following link, which is hosted on Vercel:

> Please note:
>
> -   The production database is currently being hosted locally to expect a delay for all database actions.
> -   This project is work in progress so expect some features to be incomplete.
> -   Please do not enter any persanal data as this project is open to anyone to view.

[Takeaway Website on Vercel](https://takeaway-website.vercel.app/)

Feel free to browse the site and experience the features we've implemented so far.

This project has been launched in Stripe test mode meaning that the website will not be taking payment upon checkout at this time. To test this please visit the stripe documentation

[Stripe Test Mode Documentation](https://stripe.com/docs/test-mode/)

[Stripe Test Payment Methods](https://stripe.com/docs/testing#cards/)

After creating an order you will be redirected to a customer order page where you can see your order details and status. You will also recieve an email after an order has been places aswell as emails upon order status change.

To visit the admin dashboard login with these credentials and go to the link below:
email: `padmanathantom@gmail.com`
password: `mypass`

[Takeaway Website Admin Page](https://takeaway-website.vercel.app/admin/orders)

## Features

-   **Ordering System**: Easily place and customize orders. Select items, specify preferences, and add them to your cart.

-   **Shopping Cart**: A dynamic shopping cart that allows users to save, review and modify their orders before proceeding to checkout.

-   **Secure Payment Processing**: Stripe, a trusted and industry-leading payment processing platform, is utilized to ensure the utmost security and reliability when handling payments.

-   **Real-time Order Tracking**: Keep track of your order's status in real-time, from preparation to delivery.

-   **Order Management for Admins**: Admins have the ability to efficiently manage and oversee orders. With an intuitive dashboard, they can track orders in real-time, update order statuses, and ensure a seamless ordering process for customers..

## Technologies Used

-   **TypeScript**: The entire project is written in TypeScript, ensuring type safety and better code quality.

-   **Next.js**: I've used Next.js for server-side rendering and a faster page load experience. It also provides routing and API handling.

-   **Tailwind CSS**: The user interface is styled using Tailwind CSS, allowing for quick and responsive design adjustments.

-   **Git**: Git is the version control system of choice for managing and tracking changes to the project's source code.

-   **MySQL**: Currently using MySQL as the database management system to store and retrieve data efficiently.

-   **Sequelize**: To query the MySQL database efficiently and to prevent sequrity risks.

## Knowen Bugs/Upcomming Changes

I am committed to continuously improving this project. Here are some bug fixes and changes I plan to implement in the near future:

-   **Cart Storage:** Change how the cart is stored to be linked to user accounts and to store multiple items using a quantity property. This will fix an issue when deleting items from your cart.

-   **Delete Account:** Update the delete account backend to delete the users other table data. Currently if the user has any other data in these tables then it will throw an error.

-   **Products Storage:** Store the products in the database and be able to update them to be inactive in the admin UI.

-   **Stripe Payment Elements:** Migrate from using stripe payment elements to creating site UI to improve site consistancy.

## Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/TomPadmanathan/takeaway-website.git
```

2. Navigate to the project directory.

```bash
cd takeaway-website
```

3. Install the project dependencies.

```bash
npm i
```

4. Set environment variables.

```bash
cp .env.example .env
```

Then enter your environment variables.

5. Start the development server.

```bash
npm run dev
```

6. Open your browser and access the website at [localhost:3000](http://localhost:3000)

## Contribution Guidelines

Contributions from the community to help improve this project are more than welcome. If you'd like to contribute, please follow these guidelines:

-   Fork the repository.
-   Create a new branch for your feature or bug fix.
-   Make your changes and ensure they are well-tested.
-   Submit a pull request with a clear description of your changes.

## Issues and Feedback

If you encounter any issues, have feedback, or want to suggest new features, please open an issue on this repository. I appreciate your input and contributions to make this project better.
