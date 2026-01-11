import { BreadcrumbItem as BreadcrumbType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ResponsiveBreadcrumb } from "./responsive-breadcrumb";

interface Props extends React.ComponentProps<"div"> {
  breadcrumbs?: BreadcrumbType[];
  ITEMS_TO_DISPLAY?: number;
}

export default function Container({
  breadcrumbs,
  ITEMS_TO_DISPLAY,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn("max-w-7xl py-12 space-y-6 mx-auto", className)}
      {...props}
    >
      {!!breadcrumbs && (
        <ResponsiveBreadcrumb
          items={breadcrumbs}
          ITEMS_TO_DISPLAY={ITEMS_TO_DISPLAY}
        />
      )}
      {children}
    </div>
  );
}
