import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import "./textAnalyzer.css";
function TextAnalyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [sentiment, setSentiment] = useState({
    emotion: "",
    intent: "",
    keywords: [],
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login-user";
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSentiment({ emotion: "", intent: "", keywords: [] });
    if (text !== "") {
      setSubmitted(true);
      setLoading(true);
      fetch("https://iby-project.onrender.com/api/sentiment", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          text,
        })
          .replace(/\s+/g, " ")
          .trim(),
      })
        .then((res) => {
          setLoading(false);
          setSubmitted(false);
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          setSentiment(data);
        })
        .catch((err) => {
          setLoading(false);
          setSubmitted(false);
          setSentiment({ emotion: "", intent: "", keywords: [] });

          console.log(err);
        });
    }
  };

  return (
    <div className="main">
      <div className="text">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Get your paragraph analyzed"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          {submitted && loading && <Loading />}
        </form>
        {sentiment.emotion && (
          <div className="card">
            <div>
              <h2>Emotion</h2>
              <p>
                {sentiment.emotion.emotion} : {sentiment.emotion.score}%
              </p>
            </div>
            <div>
              <h2>Intent</h2>
              <p>
                {sentiment.intent.emotion}: {sentiment.intent.score}%
              </p>
            </div>
          </div>
        )}
        <table>
          <tbody>
            { sentiment.keywords.length !== 0  && (
              <tr>
                <th>
                  <h2>Keywords</h2>
                </th>
                <th>
                  <h2>Confidence</h2>
                </th>
              </tr>
            )}
            { sentiment.keywords.length !== 0  && (
              sentiment.keywords.map((keyword, key) => {
                return (
                  <tr key={key}>
                    <td>{keyword.keyword}</td>
                    <td>{Math.round(keyword.confidence_score * 100)}%</td>
                  </tr>
                );
              })
            ) }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TextAnalyzer;
