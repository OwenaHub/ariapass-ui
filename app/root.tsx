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
          // closeButton
          position="bottom-left"
          toastOptions={{
            classNames: {
              actionButton: '!px-2 !rounded-full !text-white',
            },
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  const { state } = useNavigation();
  let busy: boolean = state === "submitting" || state === "loading";

  return (
    <div className={`${busy && "opacity-35"} transition`}>
      <Outlet />
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <DefaultError error={error} />
}

