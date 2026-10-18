import { describe, expect, it } from "vitest";
import companies from "../data/companies.json";
import { contrastRatio } from "./contrast";

// Colours from src/index.css
const LIGHT_SURFACE = "#ffffff";
const LIGHT_PAGE = "#f4f7fb";
const DARK_SURFACE = "#1c222c";
const DARK_PAGE = "#14181f";

const AA_NORMAL_TEXT = 4.5;

describe("contrastRatio", () => {
  it("gives 21 for black on white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
  });

  it("gives 1 for the same colour twice", () => {
    expect(contrastRatio("#0b5fa5", "#0b5fa5")).toBeCloseTo(1, 5);
  });

  it("gives the same answer whichever colour comes first", () => {
    expect(contrastRatio("#0b5fa5", "#ffffff")).toBeCloseTo(
      contrastRatio("#ffffff", "#0b5fa5"),
      5,
    );
  });
});

describe("company accent colours", () => {
  for (const company of companies) {
    it(`${company.name}: the light accent passes 4.5:1 on white and the page background`, () => {
      expect(contrastRatio(company.accent, LIGHT_SURFACE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      expect(contrastRatio(company.accent, LIGHT_PAGE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it(`${company.name}: the dark accent passes 4.5:1 on both dark backgrounds`, () => {
      expect(contrastRatio(company.accentDark, DARK_SURFACE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
      expect(contrastRatio(company.accentDark, DARK_PAGE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  }
});