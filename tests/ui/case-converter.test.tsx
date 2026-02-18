import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CaseConverterPage from "../../app/case-converter/page";

describe("Case Converter page", () => {
  it("renders required controls", () => {
    render(<CaseConverterPage />);
    expect(screen.getByLabelText("Input")).toBeInTheDocument();
    expect(screen.getByLabelText("Output")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "UPPERCASE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy Output" })).toBeInTheDocument();
  });

  it("updates output and supports copy/clear", async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.assign(navigator, { clipboard });

    render(<CaseConverterPage />);
    const user = userEvent.setup();

    const input = screen.getByLabelText("Input");
    await user.type(input, "hello world");

    await user.click(screen.getByRole("button", { name: "UPPERCASE" }));
    const output = screen.getByLabelText("Output") as HTMLTextAreaElement;
    expect(output.value).toBe("HELLO WORLD");

    await user.click(screen.getByRole("button", { name: "Copy Output" }));
    expect(clipboard.writeText).toHaveBeenCalledWith("HELLO WORLD");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect((screen.getByLabelText("Input") as HTMLTextAreaElement).value).toBe(
      ""
    );
  });
});
