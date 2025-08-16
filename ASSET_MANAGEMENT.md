# Asset Management

- All images use Next.js <Image> for optimization, lazy loading, and responsive sizes.
- Lucide React is used for scalable icons via the `Icons` component.
- Logos: Place SVG/PNG logo variations in `public/assets/logos/` (primary, white, black, icon-only).
- Placeholders: Use `/assets/placeholders/` for product, event, testimonial images (WebP format recommended).
- All images are lazy loaded by default.
- WebP is the preferred format for new uploads; fallback to PNG/JPG if needed.
- Responsive image sizes are configured in the `OptimizedImage` component.
- For admin image upload/management, see `lib/adminImageManager.ts` (to be implemented).
