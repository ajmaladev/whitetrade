# Payload Website Template

This is the official [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website). Use it to power websites, blogs, or portfolios from small to enterprise. This repo includes a fully-working backend, enterprise-grade admin panel, and a beautifully designed, production-ready website.

This template is right for you if you are working on:

- A personal or enterprise-grade website, blog, or portfolio
- A content publishing platform with a fully featured publication workflow
- Exploring the capabilities of Payload

Core features:

- [Pre-configured Payload Config](#how-it-works)
- [Authentication](#users-authentication)
- [Access Control](#access-control)
- [Layout Builder](#layout-builder)
- [Draft Preview](#draft-preview)
- [Live Preview](#live-preview)
- [On-demand Revalidation](#on-demand-revalidation)
- [SEO](#seo)
- [Search](#search)
- [Redirects](#redirects)
- [Jobs and Scheduled Publishing](#jobs-and-scheduled-publish)
- [Website](#website)

## Quick Start

To spin up this example locally, follow these steps:

### Clone

If you have not done so already, you need to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

#### Method 1 (recommended)

Go to Payload Cloud and [clone this template](https://payloadcms.com/new/clone/website). This will create a new repository on your GitHub account with this template's code which you can then clone to your own machine.

#### Method 2

Use the `create-payload-app` CLI to clone this template directly to your machine:

```bash
pnpx create-payload-app my-project -t website
```

#### Method 3

Use the `git` CLI to clone this template directly to your machine:

```bash
git clone -n --depth=1 --filter=tree:0 https://github.com/payloadcms/payload my-project && cd my-project && git sparse-checkout set --no-cone templates/website && git checkout && rm -rf .git && git init && git add . && git mv -f templates/website/{.,}* . && git add . && git commit -m "Initial commit"
```

### Development

1. First [clone the repo](#clone) if you have not done so already
1. `cd my-project && cp .env.example .env` to copy the example environment variables
1. `pnpm install && pnpm dev` to install dependencies and start the dev server
1. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel and unpublished content. See [Access Control](#access-control) for more details.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Posts

  Posts are used to generate blog posts, news articles, or any other type of content that is published over time. All posts are layout builder enabled so you can generate unique layouts for each post using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Posts are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Pages

  All pages are layout builder enabled so you can generate unique layouts for each page using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Pages are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

- #### Gallery

  A dedicated collection for managing gallery images with responsive layout and animations. The gallery page displays images in a responsive grid with staggered animations, hover effects, and a modal lightbox for viewing images. Features include:

  - Responsive grid layout (1-4 columns based on screen size)
  - Staggered entrance animations (slide-in-left, slide-in-bottom, slide-in-right)
  - Hover effects with image scaling and overlay
  - Modal lightbox with keyboard navigation (arrow keys, escape)
  - Loading skeletons for better UX
  - Image counter and navigation controls

- #### Categories

  A taxonomy used to group posts together. Categories can be nested inside of one another, for example "News > Technology". See the official [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) for more details.

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Access control

Basic access control is setup to limit access to various content based based on publishing status.

- `users`: Users can access the admin panel and create or edit content.
- `posts`: Everyone can access published posts, but only users can create, update, or delete them.
- `pages`: Everyone can access published pages, but only users can create, update, or delete them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Layout Builder

Create unique page layouts for any type of content using a powerful layout builder. This template comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

Each block is fully designed and built into the front-end website that comes with this template. See [Website](#website) for more details.

## Lexical editor

A deep editorial experience that allows complete freedom to focus just on writing content without breaking out of the flow with support for Payload blocks, media, links and other features provided out of the box. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

All posts and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/examples/draft-preview).

## Live preview

In addition to draft previews you can also enable live preview to view your end resulting page as you're editing content with full support for SSR rendering. See [Live preview docs](https://payloadcms.com/docs/live-preview/overview) for more details.

## On-demand Revalidation

We've added hooks to collections and globals so that all of your pages, posts, or footer or header, change they will automatically be updated in the frontend via on-demand revalidation supported by Nextjs.

> Note: if an image has been changed, for example it's been cropped, you will need to republish the page it's used on in order to be able to revalidate the Nextjs image cache.

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Search

This template also pre-configured with the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Jobs and Scheduled Publish

We have configured [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) which uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) in order to publish or unpublish your content on a scheduled time. The tasks are run on a cron schedule and can also be run as a separate instance if needed.

> Note: When deployed on Vercel, depending on the plan tier, you may be limited to daily cron only.

## Website

This template includes a beautifully designed, production-ready front-end built with the [Next.js App Router](https://nextjs.org), served right alongside your Payload app in a instance. This makes it so that you can deploy both your backend and website where you need it.

Core features:

- [Next.js App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)
- User Accounts and Authentication
- Fully featured blog
- Publication workflow
- Dark mode
- Pre-made layout building blocks
- SEO
- Search
- Redirects
- Live preview

### Cache

Although Next.js includes a robust set of caching strategies out of the box, Payload Cloud proxies and caches all files through Cloudflare using the [Official Cloud Plugin](https://www.npmjs.com/package/@payloadcms/payload-cloud). This means that Next.js caching is not needed and is disabled by default. If you are hosting your app outside of Payload Cloud, you can easily reenable the Next.js caching mechanisms by removing the `no-store` directive from all fetch requests in `./src/app/_api` and then removing all instances of `export const dynamic = 'force-dynamic'` from pages files, such as `./src/app/(pages)/[slug]/page.tsx`. For more details, see the official [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).

## Development

To spin up this example locally, follow the [Quick Start](#quick-start). Then [Seed](#seed) the database with a few pages, posts, and projects.

### Working with Postgres

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

#### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploy with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to run them and it will keep a record of migrations that have been run in the database.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with a few pages, posts, and projects you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@payloadcms.com`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
1. When you're ready to go live, see Deployment below for more details.

### Deploying to Payload Cloud

The easiest way to deploy your project is to use [Payload Cloud](https://payloadcms.com/new/import), a one-click hosting solution to deploy production-ready instances of your Payload apps directly from your GitHub repo.

### Deploying to Vercel

This template can also be deployed to Vercel for free. You can get started by choosing the Vercel DB adapter during the setup of the template or by manually installing and configuring it:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  // ...
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // ...
```

We also support Vercel's blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // ...
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // ...
```

There is also a simplified [one click deploy](https://github.com/payloadcms/payload/tree/templates/with-vercel-postgres) to Vercel should you need it.

### Self-hosting

Before deploying your app, you need to:

1. Ensure your app builds and serves in production. See [Production](#production) for more details.
2. You can then deploy Payload as you would any other Node.js or Next.js application either directly on a VPS, DigitalOcean's Apps Platform, via Coolify or more. More guides coming soon.

You can also deploy your app manually, check out the [deployment documentation](https://payloadcms.com/docs/production/deployment) for full details.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

# WhiteTrade - Premium Trading Solutions

A comprehensive trading platform built with Next.js, Payload CMS, and advanced SEO optimization.

## 🚀 SEO Features Implemented

### 1. **Comprehensive SEO Component System**

- **Dynamic SEO Generation**: `src/components/SEO/index.tsx`
- **Automatic metadata generation** for all content types
- **Structured data** for better search engine understanding
- **Open Graph and Twitter Card** optimization
- **Keyword optimization** for trading and financial services

### 2. **Page-Level SEO Implementation**

- ✅ **Home Page**: Dynamic SEO with trading-focused keywords
- ✅ **Category Pages**: Category-specific SEO with product listings
- ✅ **Posts Pages**: Blog SEO with article structured data
- ✅ **Individual Post Pages**: Article SEO with author and publication data
- ✅ **Gallery Page**: Image gallery SEO with product showcase
- ✅ **Search Page**: Search results SEO with dynamic query handling
- ✅ **404 Page**: Proper error page SEO with noindex

### 3. **Component-Level SEO Enhancements**

- ✅ **HomePage Component**: Structured data for website and services
- ✅ **Categories Component**: Service listings with microdata
- ✅ **Footer Component**: Organization structured data
- ✅ **MegaMenu Component**: Navigation structured data
- ✅ **AboutUs Component**: Company information with contact data
- ✅ **Reviews Component**: Customer testimonials with review structured data
- ✅ **Testimonials Component**: Statistics and achievements
- ✅ **Certificates Component**: Professional certifications

### 4. **Technical SEO Infrastructure**

- ✅ **Enhanced Sitemaps**:
  - Pages sitemap with priority and change frequency
  - Posts sitemap with publication dates
  - Categories sitemap for better indexing
  - Products sitemap for product discovery
  - Sitemap index for comprehensive coverage
- ✅ **Robots.txt**: Comprehensive crawling rules
- ✅ **Semantic HTML**: Proper heading hierarchy and ARIA labels
- ✅ **Structured Data**: JSON-LD implementation for all content types

### 5. **SEO-Optimized Content Types**

#### Home Page

- **Title**: "WhiteTrade - Premium Trading Solutions & Financial Services"
- **Keywords**: trading platform, financial services, investment opportunities, forex trading, cryptocurrency trading, stock trading, commodities trading, trading education, market analysis, trading tools
- **Structured Data**: WebSite, Organization, SearchAction

#### Category Pages

- **Dynamic titles** based on category name
- **Category-specific keywords** and descriptions
- **Structured Data**: CollectionPage, ItemList, Product listings

#### Blog Posts

- **Article structured data** with author information
- **Publication dates** and modification dates
- **Category and tag** optimization
- **Related posts** linking

#### Products

- **Product structured data** with pricing and availability
- **Brand information** and category classification
- **Image optimization** with alt text

### 6. **Performance & Accessibility**

- **Semantic HTML5** elements (section, article, nav, main, footer)
- **ARIA labels** and roles for screen readers
- **Proper heading hierarchy** (h1, h2, h3)
- **Alt text** for all images
- **Keyboard navigation** support
- **Screen reader** compatibility

### 7. **Search Engine Optimization**

- **Meta descriptions** for all pages
- **Canonical URLs** to prevent duplicate content
- **Open Graph tags** for social media sharing
- **Twitter Card** optimization
- **Schema.org markup** for rich snippets
- **Local SEO** with address and contact information

## 🛠 Technical Implementation

### SEO Component Usage

```typescript
import { generateDynamicSEO } from '@/components/SEO'

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicSEO({
    data: yourData,
    type: 'home' | 'page' | 'post' | 'category' | 'product',
    title: 'Custom Title',
    description: 'Custom description',
    keywords: ['keyword1', 'keyword2'],
  })
}
```

### Structured Data Examples

- **Organization**: Company information, contact details, social profiles
- **WebSite**: Search functionality, site navigation
- **Article**: Blog posts with author and publication data
- **Product**: Product listings with pricing and availability
- **Service**: Trading services and categories
- **Review**: Customer testimonials and ratings
- **AggregateRating**: Overall company ratings

## 📊 SEO Benefits

1. **Better Search Rankings**: Comprehensive keyword optimization
2. **Rich Snippets**: Structured data for enhanced search results
3. **Social Media Optimization**: Open Graph and Twitter Card support
4. **Local SEO**: Address and contact information for local searches
5. **Mobile Optimization**: Responsive design with proper meta tags
6. **Accessibility**: WCAG compliant with semantic HTML
7. **Performance**: Optimized images and efficient code structure

## 🔧 Environment Variables

Add these to your `.env.local`:

```env
GOOGLE_VERIFICATION=your_google_verification_code
YANDEX_VERIFICATION=your_yandex_verification_code
YAHOO_VERIFICATION=your_yahoo_verification_code
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

## 📈 Monitoring & Analytics

- **Google Search Console**: Monitor search performance
- **Google Analytics**: Track user behavior and conversions
- **Schema.org Validator**: Verify structured data implementation
- **Lighthouse**: Performance and SEO audits

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`
5. Access the admin panel at `/admin`
6. Create content and watch SEO optimization in action

## 📝 Content Guidelines

- Use descriptive titles and meta descriptions
- Include relevant keywords naturally in content
- Optimize images with descriptive alt text
- Maintain consistent heading hierarchy
- Update content regularly for better rankings

---

Built with ❤️ using Next.js, Payload CMS, and advanced SEO techniques.
