import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import TextArea from "../../components/TextArea";

describe("TextArea XSS safety", () => {
  it("escapes HTML in value", () => {
    const payload = "<script>alert(1)</script>";
    const markup = renderToStaticMarkup(
      <TextArea id="xss" label="Input" value={payload} readOnly />
    );

    expect(markup).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });
});
