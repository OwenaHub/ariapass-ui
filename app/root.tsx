import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import DefaultError from "./components/custom/default-error";
import GlobalLoader from "./components/custom/global-loader";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster
          richColors
          position="top-center"
        />
      </body>
    </html>
  );
}

export default function App() {
  const { state } = useNavigation();
  let busy: boolean = state === "submitting" || state === "loading";

  return (
    <>
      <GlobalLoader busy={busy} />

      <div className={`${busy ? "opacity-35" : "opacity-100"} transition-opacity duration-300`}>
        <Outlet />
      </div>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <DefaultError error={error} />
}

