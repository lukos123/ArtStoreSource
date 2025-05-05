

````markdown
# Ecommerce

**Version:** 0.1.0

## Description

A modern e-commerce web application built with [Next.js](https://nextjs.org/), React, TypeScript, Redux Toolkit, and Sass.  
Users can browse products, view details, leave comments, manage a shopping cart, and place orders.  
Sellers can create, edit, and delete products, and view notifications for new orders.

## Features

- Product listing, detail view, and search  
- User authentication (login, registration)  
- Create, edit, and delete products (with image upload)  
- Comments on products  
- Shopping cart management  
- Order creation and status updates  
- Notifications for suppliers and clients  
- User profile pages

## Tech Stack

- **Frontend:** Next.js 14.2.4, React 18, TypeScript :contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}  
- **State Management:** Redux Toolkit, React Redux  
- **Styling:** Sass, global CSS  
- **API:** RESTful endpoints (base URL configurable in `src/api/api.ts`) :contentReference[oaicite:8]{index=8}:contentReference[oaicite:9]{index=9}  
- **Linting & Formatting:** ESLint (`next/core-web-vitals`)  
- **Docker:** Containerized with Node.js for easy development and deployment :contentReference[oaicite:10]{index=10}

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>.git
   cd ecommerce
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure the API base URL**
   By default, `API` is set to `http://localhost:5001` in `src/api/api.ts`.
   To change it, update the `API` constant in that file.

4. **Run in development mode**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build and start production**

   ```bash
   npm run build
   npm run start
   ```

6. **Lint the code**

   ```bash
   npm run lint
   ```

## Docker

Build and run the app in a Docker container:

```bash
docker build -t ecommerce-app .
docker run -p 3000:3000 ecommerce-app
```

## Folder Structure

```
├── app/                   # Next.js app directory (routes & pages)
├── components/            # Reusable React components
├── api/                   # API helper functions (`api/api.ts`)
├── store/                 # Redux slices and store configuration
├── types/                 # TypeScript interfaces
├── hooks/                 # Custom React hooks
├── public/                # Static assets
├── styles/                # Global and module Sass/CSS
├── Dockerfile
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

```
```
