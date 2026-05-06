import { useState } from "react";
import { Send } from "../utils";

const SpamHamPredictor = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(
    "Please enter a <b class='!text-[24px]'>statement</b> above",
  );
  const [charCount, setCharCount] = useState(0);

  const fetch_data = async (text) => {
    text = text.slice(0, 100);
    if (text.toLowerCase() == "") return;

    const response = await fetch(
      "https://technicalsquad-spam-ham-detection.hf.space/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      },
    );

    const data = await response.json();
    const pred_percentage = data[0]["prediction"][0][0];

    display_result(pred_percentage);
  };

  const display_result = (pred_percentage) => {
    if (pred_percentage <= 0.5 && pred_percentage >= 0.3) {
      setResult("It is Likely a <b class='!text-[24px]'>ham</b> message!");
    } else if (pred_percentage <= 0.3 && pred_percentage >= 0.0) {
      setResult("It is a <b class='!text-[24px]'>ham</b> message!");
    }

    if (pred_percentage >= 0.5 && pred_percentage <= 0.7) {
      setResult("It is Likely a <b class='!text-[24px]'>spam</b> message!");
    } else if (pred_percentage >= 0.7 && pred_percentage <= 1.0) {
      setResult("It is a <b class='!text-[24px]'>spam</b> message!");
    }
  };

  const check_length = (length) => {
    //set chars count to the length of the input
    setCharCount(length);
    //if length exeeded slice
    if (length > 100) {
      //setInput(input.slice(0, 100));
      return;
    }
  };
  return (
    <main>
      <div className="w-full h-full min-h-screen bg-bg flex items-center justify-center p-[20px] md:p-[0px]">
        <div className="w-fit min-w-[45%] md:max-w-[70%] container">
          <h1 className="h1">Spam Ham Predictor</h1>

          <div className="w-full h-max-[60px] h-[45px] relative flex items-center border-2 border-black rounded-[8px]">
            <input
              className="focus:outline-0 rounded-[8px] w-full h-full pl-[8px]"
              id="review-input"
              placeholder="Enter the Sentence"
              value={input}
              onChange={(e) => {
                check_length(e.target.value.length);
                setInput(e.target.value);
              }}
            ></input>
            <p className="text-[12px] font-medium text-gray-600 select-none absolute right-10 bottom-0">
              {charCount}/100
            </p>
            <div
              onClick={() => fetch_data(input)}
              className="w-fit p-2 h-full flex items-center justify-center bg-black cursor-pointer"
            >
              <img src={Send} alt="sent" />
            </div>
          </div>

          <div className="w-full h-full flex justify-center md:flex-row flex-col items-stretch gap-[8px] p-[12px]">
            <p
              className="text-[16px]"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>

          <div className="w-full h-fit flex items-center justify-between">
            <p className="text-[14px] text-gray-600 select-none">v1.0</p>
            <p className="text-[14px] text-gray-600 select-none">
              Made by Aadi
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpamHamPredictor;
