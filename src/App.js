import "./App.css";
import React from "react";

import Question from "./Question";

function App() {
  const handleReplyClick = () => {
    alert("reply clicked!");
  };

  return (
    <div className="App">
      <h1>Question and Reply Box</h1>
      <Question
        question="What are your opinions on registration?"
        onReplyClick={handleReplyClick}
      />
      {/*Add more Questions components as needed*/}
    </div>
  );
}

export default App;
