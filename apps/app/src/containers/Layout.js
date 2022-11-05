import { x } from "@xstyled/styled-components";

import { Catch } from "@/components";
import { ErrorPage } from "@/pages/ErrorPage";

import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { AppNavbar } from "./AppNavbar";
import { SyncAlert } from "./SyncAlert";

export const Layout = ({ children }) => {
  return (
    <x.div
      minHeight="100%"
      display="flex"
      flexDirection="column"
      backgroundColor="bg"
    >
      <x.div flex="0 0 auto">
        <AppNavbar />
        <AppHeader />
      </x.div>

      <SyncAlert />

      <x.main mt={6} flex="1 1 auto">
        <Catch fallback={<ErrorPage />}>{children}</Catch>
      </x.main>

      <x.footer flex="0 0 auto" mt={16}>
        <AppFooter />
      </x.footer>
    </x.div>
  );
};
