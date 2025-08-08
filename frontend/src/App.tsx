import { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    window.Prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    // console.log(await response.data)
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            {/* <pre>
              <code className="language-javascript">
                {}
              </code>
            </pre> */}

            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                window.Prism.highlight(
                  code,
                  window.Prism.languages.javascript,
                  "javascript"
                )
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
                backgroundColor: "rgb(21, 21, 21)",
                overflow: "auto",
                borderRadius: "0.7rem",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div
          className="right"
          style={{
            fontSize: "1rem",
            height: "100%",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
