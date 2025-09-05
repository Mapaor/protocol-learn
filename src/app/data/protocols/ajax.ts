import { Protocol } from "../../types/protocol";

export const AJAX: Protocol = {
    id: "ajax",
    name: "AJAX",
    category: "Web",
    difficulty: "Beginner",
    shortDescription: "Asynchronous JavaScript and XML for dynamic web content",
    fullDescription: "AJAX (Asynchronous JavaScript and XML) is a set of web development techniques that allows web applications to send and retrieve data from a server asynchronously without interfering with the display and behavior of the existing page.",
    advantages: [
      "Asynchronous data loading",
      "Improved user experience",
      "Reduced server load",
      "Dynamic content updates",
      "No page refresh required",
      "Better responsiveness"
    ],
    disadvantages: [
      "Browser compatibility issues",
      "SEO challenges",
      "Complex error handling",
      "Security considerations",
      "Debugging difficulties"
    ],
    useCases: [
      "Dynamic form validation",
      "Auto-complete features",
      "Live search results",
      "Real-time updates",
      "Single-page applications",
      "Progressive loading",
      "Chat applications",
      "Social media feeds",
      "E-commerce cart updates",
      "Dashboard widgets",
      "Interactive maps",
      "Content filtering"
    ],
    examples: [
      {
        title: "XMLHttpRequest Example",
        code: `// Traditional XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();`,
        explanation: "Classic AJAX implementation using XMLHttpRequest to fetch data asynchronously."
      },
      {
        title: "Modern Fetch API",
        code: `// Modern Fetch API
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateUI(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Async/await syntax
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error('Error:', error);
  }
}`,
        explanation: "Modern AJAX using the Fetch API with Promise-based and async/await patterns."
      }
    ],
    relatedProtocols: ["http", "json", "xml"],
    resources: [
      {
        title: "MDN AJAX Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX",
        type: "Documentation"
      },
      {
        title: "Fetch API Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        type: "Documentation"
      }
    ]
  }