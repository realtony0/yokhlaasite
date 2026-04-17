/**
 * Server-side JSON-LD injector. Renders a <script type="application/ld+json">
 * with the given object. Use in server components (layout, page, article).
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Minify + sanitize to prevent XSS via closing script tag injection
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
