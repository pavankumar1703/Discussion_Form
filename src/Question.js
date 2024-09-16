import React, { useState, useEffect } from "react";
import db from "./firebase_setup/firebase";

const Question = ({ questionID }) => {
  const [question, setQuestion] = useState("");
  // const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const questionRef = db.ref("question/${questionID");
    questionRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setQuestion(data.text);
        setReplies(data.replies || {});
      }
    });
    return () => {
      questionRef.off();
    };
  }, [questionID]);

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };
  // const handleReplyChange = (e) => {
  //   setReply(e.target.value);
  // };

  const handleReplySubmit = () => {
    // console.timeLog("Submitted reply:", reply);
    // setReply("");
    const replyRef = db.ref("questions/{questionID}/replies");
    const newReplyRef = replyRef.push();
    newReplyRef.set(replyText);
    setReplyText("");
    // repliesRef
    //   .push(reply)
    //   .then(() => {
    //     console.log("Reply submitted: ", reply);
    //     setReply("");
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting reply:", error);
    //   });
  };

  return (
    <div className="question-box">
      <div className="question-text">{question}</div>
      {Object.keys(replies).map((replyID) => (
        <div key={replyID} className="reply">
          {replies[replyID]}
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Your voice..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleReplySubmit}>Submit Voice</button>
      </div>
      {/* {showReplyInput ? (
        <div>
          <input
            type="text"
            placeholder="Your voice..."
            value={reply}
            onChange={handleReplyChange}
          />
          <button onClick={handleReplySubmit}>Submit your Voice</button>
        </div>
      ) : (
        <button className="replay-button" onClick={handleReplyClick}>
          Reply
        </button>
      )} */}
    </div>
  );
};

export default Question;
//
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }
