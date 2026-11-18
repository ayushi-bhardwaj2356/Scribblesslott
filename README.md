# Scribblesslott

Handmade and personalized gifting website for Scribblesslott, made in Jaipur and delivered across India.

Customers browse the collection, open a product, and place an order through a form. The inquiry is saved in MongoDB and WhatsApp opens with a message ready to send. There is no cart and no online payment.

## Project structure

```
scribblesslott/
  client/     React + Vite storefront
  server/     Express + MongoDB API
```

## What you need installed

- Node.js 20 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Install dependencies

From the project folder:

```bash
npm run install:all
```

That installs the root helper, the server, and the client.

## 2. Environment variables

### Server — `server/.env`

Copy `server/.env.example` if `.env` is missing.

| Variable | Purpose |
| --- | --- |
| `PORT` | API port. Default `5000`. |
| `MONGODB_URI` | MongoDB connection string. Local default: `mongodb://127.0.0.1:27017/scribblesslott` |
| `CLIENT_ORIGIN` | Frontend address allowed by CORS. Default `http://localhost:5173` |

Do not commit the real `.env` file.

### Client — `client/.env`

Copy `client/.env.example` if `.env` is missing.

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend API base. Local value: `http://localhost:5000/api` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number in international form with no plus, for example `91XXXXXXXXXX` |
| `VITE_ALT_PHONE` | Optional second phone shown on the contact page |
| `VITE_CONTACT_EMAIL` | Studio email |
| `VITE_INSTAGRAM_URL` | Instagram profile |

The business WhatsApp number is read from `VITE_WHATSAPP_NUMBER`. Change it in `client/.env`, then restart the frontend. It is not written through the React code.

The copy of `.env` in this project is already filled from the Scribblesslott contact card:

- WhatsApp: `916375869121`
- Second phone: `919352059073`
- Email: `scribblesslott@gmail.com`
- Instagram: `https://www.instagram.com/scribblesslott/`

## 3. MongoDB

Local MongoDB:

1. Start MongoDB.
2. Leave `MONGODB_URI=mongodb://127.0.0.1:27017/scribblesslott`.

The API creates the `scribblesslott` database on first connection. If the products collection is empty, the server loads the sample catalogue automatically.

MongoDB Atlas:

1. Create a free cluster and a database user.
2. Put the connection string in `server/.env` as `MONGODB_URI`.
3. Allow your IP in Atlas network access.

After you change prices or products, update the catalogue and seed again:

```bash
npm run seed
```

The editable catalogue is `server/data/products.js`. Prices there are sample values.

## 4. Run the website

From the project folder, with MongoDB already running:

```bash
npm run dev
```

- Storefront: http://localhost:5173
- API health: http://localhost:5000/api/health

Or run them in two terminals:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

## Pages

- Home
- Shop, with search, category filter and price sort
- Product details
- Custom order and custom gift inquiry
- About
- Contact
- Privacy policy and terms

## Order flow

1. The form is validated in the browser.
2. WhatsApp opens with the inquiry written out.
3. The same inquiry is saved through `POST /api/inquiries`.
4. If saving fails, a clear message is shown and WhatsApp can still be used, so the inquiry is not lost.

## API

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id` — MongoDB id or product slug
- `GET /api/categories`
- `POST /api/inquiries`

## What to customize

| Item | Where |
| --- | --- |
| WhatsApp number, email, Instagram | `client/.env` |
| Prices, names, descriptions | `server/data/products.js`, then `npm run seed` |
| Product photographs | Replace files in `client/public/images/products` and keep the same file name, or change the path in the catalogue |
| Founder photograph | Replace `client/public/images/founder.jpg` |
| Logo | The site uses a monogram “S”. Swap `client/src/components/Logo.jsx` if you have a final logo file |
| Gallery | `client/src/pages/Home.jsx` |

A few products (resin keychain, fridge magnet, ribbon bouquet, lippan art and the pouch) use illustrated placeholders because those photographs were not in the brand deck. Replace the `.svg` files with your photos when you have them.

Photo magazines and frames are marked as the most loved pieces.

## This version does not include

Accounts, cart, online payment, shipping integration, OTP, or an admin dashboard. Orders stay on WhatsApp, which is the intended first version.
