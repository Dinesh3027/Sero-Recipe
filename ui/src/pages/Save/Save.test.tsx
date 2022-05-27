import { render } from "@testing-library/react";
import { Recipe } from "@models/Recipe";
import { Save } from "./Save";

describe("Testing Add Recipe page", () => {
    const save = render(<Save />);
    test("should display a blank form", async () => {
        const saveForm = await save.findByTestId("add-form");
        expect(saveForm).toMatchObject(Recipe);
    });
});
