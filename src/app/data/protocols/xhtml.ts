import { Protocol } from "../../types/protocol";

export const XHTML: Protocol = {
    id: "xhtml",
    name: "XHTML",
    category: "Web",
    difficulty: "Beginner",
    shortDescription: "Extensible HyperText Markup Language for structured web documents",
    fullDescription: "XHTML (Extensible HyperText Markup Language) is a family of XML markup languages that mirror or extend versions of HTML. It combines the flexibility of HTML with the strict syntax rules of XML, creating more robust and well-formed web documents.",
    port: "80 (HTTP), 443 (HTTPS)",
    versions: ["XHTML 1.0", "XHTML 1.1", "XHTML 2.0", "XHTML5"],
    advantages: [
      "Stricter syntax rules",
      "XML compatibility",
      "Better error handling",
      "Cross-platform consistency",
      "Extensible with XML namespaces",
      "Machine-readable format"
    ],
    disadvantages: [
      "More verbose than HTML",
      "Stricter parsing requirements",
      "Limited browser error recovery",
      "Learning curve for developers",
      "Performance overhead",
      "Declining adoption"
    ],
    useCases: [
      "Structured web documents",
      "Data exchange formats",
      "Mobile web applications",
      "Legacy web systems",
      "XML-based workflows",
      "Content management systems",
      "Document publishing",
      "Web standards compliance",
      "Cross-platform applications",
      "Semantic web applications",
      "Enterprise web portals",
      "Educational content"
    ],
    examples: [
      {
        title: "XHTML Document Structure",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>XHTML Document</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <h1>Welcome to XHTML</h1>
    <p>This is a well-formed XHTML document.</p>
    <img src="image.jpg" alt="Sample image" />
    <br />
    <input type="text" name="username" />
</body>
</html>`,
        explanation: "Complete XHTML document with proper XML declaration and structure."
      },
      {
        title: "XHTML vs HTML Differences",
        code: `<!-- HTML (Loose) -->
<IMG SRC="image.jpg">
<BR>
<INPUT TYPE="text" NAME="field">
<P>Paragraph without closing tag

<!-- XHTML (Strict) -->
<img src="image.jpg" alt="description" />
<br />
<input type="text" name="field" />
<p>Paragraph with proper closing tag</p>

<!-- XHTML Rules -->
- All tags must be closed
- All tags must be lowercase
- All attributes must be quoted
- All attributes must have values
- Documents must be well-formed XML`,
        explanation: "Key differences between HTML and XHTML syntax rules."
      }
    ],
    relatedProtocols: ["xml", "http"],
    resources: [
      {
        title: "XHTML 1.0 Specification",
        url: "https://www.w3.org/TR/xhtml1/",
        type: "Specification"
      },
      {
        title: "W3C XHTML Validator",
        url: "https://validator.w3.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "XSS prevention",
      "Input validation",
      "Content Security Policy",
      "XML external entity attacks",
      "Proper encoding",
      "Secure parsing"
    ]
};
