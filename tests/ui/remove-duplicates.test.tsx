import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RemoveDuplicatesPage from "../../app/remove-duplicates/page";

describe("Remove Duplicate Lines page", () => {
  it("renders controls and updates output", async () => {
    render(<RemoveDuplicatesPage />);
    const user = userEvent.setup();

    const input = screen.getByLabelText("Input");
    await user.type(input, "a\na\nb");

    const output = screen.getByLabelText("Output") as HTMLTextAreaElement;
    expect(output.value).toBe("a\nb");
    expect(screen.getByText("Total lines")).toBeInTheDocument();
    expect(screen.getByText("Unique lines")).toBeInTheDocument();
  });

  it("supports copy and clear", async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.assign(navigator, { clipboard });

    render(<RemoveDuplicatesPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Input"), "a\na\nb");
    await user.click(screen.getByRole("button", { name: "Copy Output" }));
    expect(clipboard.writeText).toHaveBeenCalledWith("a\nb");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect((screen.getByLabelText("Input") as HTMLTextAreaElement).value).toBe(
      ""
    );
  });
});
