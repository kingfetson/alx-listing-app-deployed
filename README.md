# ALX Listing App

An Airbnb clone listing page built with Next.js, TypeScript, ESLint, and TailwindCSS. This milestone sets up the foundational project structure and configuration.

## 🎯 Objective

Scaffold a Next.js application with the Pages Router (no AppRouter), TypeScript, ESLint, and TailwindCSS. Establish a clean, maintainable folder structure and configure essential settings to support future development of reusable listing components.

## 🚀 Project Setup

1. **Create Next.js App**

   ```bash
   npx create-next-app@latest alx-listing-app \
     --typescript --tailwind --eslint --no-app-router --no-src-dir
   cd alx-listing-app
   ```

2. **Confirm TailwindCSS Configuration**

   * **`tailwind.config.js`**

     ```js
     module.exports = {
       content: [
         './pages/**/*.{ts,tsx}',
         './components/**/*.{ts,tsx}',
       ],
       theme: { extend: {} },
       plugins: [],
     }
     ```

   * **`styles/globals.css`**

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

## 📁 Folder Structure

```
alx-listing-app/
├── components/
│   └── common/
│       ├── Card.tsx
│       └── Button.tsx
├── constants/
│   └── index.ts
├── interfaces/
│   └── index.ts
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── public/
│   └── assets/
│       └── placeholder.png
├── styles/
│   └── globals.css
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 📦 Core Files

### `components/common/Card.tsx`

```tsx
import { CardProps } from '../../interfaces';

export default function Card({ title, description, imageSrc }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

### `components/common/Button.tsx`

```tsx
import { ButtonProps } from '../../interfaces';

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {label}
    </button>
  );
}
```

### `interfaces/index.ts`

```ts
export interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

### `constants/index.ts`

```ts
export const PLACEHOLDER_IMAGE = '/assets/placeholder.png';
export const SITE_NAME = 'ALX Listing App';
```

### `pages/index.tsx`

```tsx
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { PLACEHOLDER_IMAGE, SITE_NAME } from '../constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{SITE_NAME}</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Cozy Cottage"
          description="A small, charming cottage in the countryside."
          imageSrc={PLACEHOLDER_IMAGE}
        />
        {/* Add more Card components as needed */}
      </main>
      <footer className="mt-8">
        <Button label="Explore Listings" onClick={() => alert('Coming soon!')} />
      </footer>
    </div>
  );
}
```

## 🌐 Assets

* Place images and SVGs in `public/assets/`, e.g., `placeholder.png`.

## 📖 How to Run Locally

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Start development server**

   ```bash
   npm run dev
   ```
3. **Open in browser**: [http://localhost:3000](http://localhost:3000)

---

*Foundation for building a maintainable, scalable Airbnb clone listing page.*
