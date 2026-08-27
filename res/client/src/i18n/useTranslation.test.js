import { describe, expect, it } from "vitest";
import { translate } from "./useTranslation";

describe("translate", () => {
  it("returns the Amharic navigation label and falls back to English for unknown locales", () => {
    expect(translate("am", "nav.browse")).toBe("ይመልከቱ");
    expect(translate("unknown", "nav.shops")).toBe("Shops");
  });
});
