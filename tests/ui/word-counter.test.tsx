import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WordCounterPage from "../../app/word-counter/page";

describe("Word Counter page", () => {
  it("renders inputs and updates counts", async () => {
    render(<WordCounterPage />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText("Text input");
    await user.type(textarea, "Hello world");

    const wordCard = screen.getByText("Word count").parentElement;
    const charCard = screen.getByText("Character count").parentElement;
    const noSpaceCard = screen.getByText("Characters (no spaces)").parentElement;

    expect(wordCard).toBeTruthy();
    expect(charCard).toBeTruthy();
    expect(noSpaceCard).toBeTruthy();

    expect(within(wordCard as HTMLElement).getByText("2")).toBeInTheDocument();
    expect(within(charCard as HTMLElement).getByText("11")).toBeInTheDocument();
    expect(within(noSpaceCard as HTMLElement).getByText("10")).toBeInTheDocument();
  });
});
