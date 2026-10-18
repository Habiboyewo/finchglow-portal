import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Remove anything a test drew on screen, so one test can't affect the next
afterEach(() => {
  cleanup();
});