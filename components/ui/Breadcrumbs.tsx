import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 text-gray-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-semibold">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-gray-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
