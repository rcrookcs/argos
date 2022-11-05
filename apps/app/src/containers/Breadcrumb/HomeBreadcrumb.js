import { HomeIcon } from "@primer/octicons-react";
import { useMatch } from "react-router-dom";

import { BreadcrumbItem, BreadcrumbLink } from "@/components";

export function HomeBreadcrumbItem() {
  const match = useMatch("/");

  return (
    <BreadcrumbItem ml={-2}>
      <BreadcrumbLink to="/" aria-current={match ? "page" : undefined}>
        <HomeIcon size={18} />
        {match ? "Home" : null}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}
