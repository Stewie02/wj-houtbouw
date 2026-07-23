import { cdataTag, escapeXml, formatPrice, stripMarkdown } from "../route"

describe("product feed formatting", () => {
  it("escapes the characters that would break the XML", () => {
    expect(escapeXml(`W&J "Tuin" <Bank>`)).toBe(
      "W&amp;J &quot;Tuin&quot; &lt;Bank&gt;"
    )
  })

  it("wraps a description in CDATA and preserves newlines", () => {
    expect(cdataTag("description", "Regel 1\nRegel 2 met <b> & \"quotes\"")).toBe(
      '      <description><![CDATA[Regel 1\nRegel 2 met <b> & "quotes"]]></description>'
    )
  })

  it("splits a literal ]]> so it cannot close the CDATA early", () => {
    expect(cdataTag("description", "a]]>b")).toBe(
      "      <description><![CDATA[a]]]]><![CDATA[>b]]></description>"
    )
  })

  it("adds BTW only when the price is stored tax-exclusive", () => {
    expect(formatPrice(1000, "eur", true)).toBe("1000.00 EUR")
    expect(formatPrice(1000, "eur", false)).toBe("1210.00 EUR")
  })

  it("flattens Markdown to plain text", () => {
    const markdown = [
      "## Douglas hout",
      "",
      "Gemaakt van **massief** hout met een [garantie](https://example.com).",
      "",
      "- Weerbestendig",
      "- Handgemaakt",
    ].join("\n")

    expect(stripMarkdown(markdown)).toBe(
      [
        "Douglas hout",
        "",
        "Gemaakt van massief hout met een garantie.",
        "",
        "Weerbestendig",
        "Handgemaakt",
      ].join("\n")
    )
  })
})
