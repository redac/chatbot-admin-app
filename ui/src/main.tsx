import { createTheme, NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./pages/Admin";
import Playground from "./pages/Playground";

const queryClient = new QueryClient();
const theme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "Supreme",
      display: "Space Grotesk",
    },
    fontSizes: {
      base: "0.95rem",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="admin" element={<Admin />} />
            <Route path="playground" element={<Playground />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </NextUIProvider>
  </React.StrictMode>
);
