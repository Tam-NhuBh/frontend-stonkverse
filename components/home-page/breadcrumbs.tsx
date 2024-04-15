// components/breadcrumbs/Breadcrumbs.tsx
import { useRouter } from "next/router";
import { BreadcrumbsProps, CrumbItem } from "@/types";
import Link from "next/link";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  return (
    <div className="container mx-auto">
      <nav className="breadcrumbs">
        {pathnames.map((_, index) => {
          const urlPart = `/${pathnames.slice(0, index + 1).join("/")}`;
          const crumb = items.find((item:any) => item.path === urlPart);
          if (!crumb) return null;

          return (
            <Link key={urlPart} href={crumb.path}>
              {crumb.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
