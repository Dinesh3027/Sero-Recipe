import { findByTestId, render } from "@testing-library/react";
import { Search } from "./Search";


describe("Testing Search page", () => {
    const searchPage = render(<Search />);
    test("should display a blank form", async () => {
        const saveForm = await searchPage.findByTestId("search-form");
        const saveInput = await searchPage.findByTestId("search-input");
        expect(saveInput).toContain("ab");
    });
});