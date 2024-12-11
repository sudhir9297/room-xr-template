"use client";

import HomePage from "@/components";
import { StoreProvider } from "@/context/store";

export default function Home() {
  return (
    <StoreProvider>
      <div className="h-screen w-screen">
        <HomePage />
      </div>
    </StoreProvider>
  );
}
