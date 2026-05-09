import { useState } from "react";
import { Send } from "../utils";

const SpamHamPredictor = () => {
  const [input, setInput] = useState("");

  const [result, setResult] = useState(
    "Please enter a <b class='!text-[24px]'>statement</b> above",
  );

  const [charCount, setCharCount] = useState(0);

  const [predPercentage, setPredPercentage] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetch_data = async (text) => {
    text = text.slice(0, 150);

    if (text.toLowerCase() == "") return;

    // =========================
    // CHANGED: loading starts
    // =========================
    setLoading(true);

    try {
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

      setPredPercentage(Number(pred_percentage.toFixed(2)) * 100);

      display_result(pred_percentage);
    } catch (error) {
      // =========================
      // CHANGED: added error handling
      // =========================
      setResult("Something went wrong while predicting the message.");
      setPredPercentage(null);
      console.log(error);

      setLoading(false);
    }
  };

  const display_result = (pred_percentage) => {
    if (pred_percentage < 0.5 && pred_percentage >= 0.3) {
      setResult("It is Likely a <b class='!text-[24px]'>ham</b> message!");
    } else if (pred_percentage <= 0.3 && pred_percentage >= 0.0) {
      setResult("It is a <b class='!text-[24px]'>ham</b> message!");
    }

    if (pred_percentage >= 0.5 && pred_percentage <= 0.7) {
      setResult("It is Likely a <b class='!text-[24px]'>spam</b> message!");
    } else if (pred_percentage >= 0.7 && pred_percentage <= 1.0) {
      setResult("It is a <b class='!text-[24px]'>spam</b> message!");
    }

    // =========================
    // CHANGED: loading ends here
    // =========================
    setLoading(false);
  };

  const check_length = (length) => {
    setCharCount(length);

    if (length > 150) {
      return;
    }
  };

  return (
    <main>
      <div className="w-full h-full min-h-screen bg-bg flex items-center justify-center p-[2px] md:p-[4px]">
        <div className="w-fit min-w-[90%] md:min-w-[50%] container">
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
            />

            <p className="text-[12px] font-medium text-gray-600 select-none absolute right-10 bottom-0">
              {charCount}/150
            </p>

            {/* =========================
                CHANGED:
                replaced div with button
                disabled while loading
                added hover animation
            ========================= */}
            <button
              onClick={() => fetch_data(input)}
              disabled={loading}
              className={`w-fit p-2 h-full flex items-center justify-center transition-all duration-200 rounded-r-[6px]
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {/* =========================
                  CHANGED:
                  icon animates while loading
              ========================= */}
              <img
                src={Send}
                alt="sent"
                className={loading ? "animate-pulse" : ""}
              />
            </button>
          </div>

          {/* =========================
              CHANGED:
              added relative container
              so loading overlay works
          ========================= */}
          <div className="relative w-full h-full flex justify-center flex-col items-stretch gap-[8px] p-[12px]">
            {/* =========================
                CHANGED:
                smooth loading overlay
                instead of replacing content
            ========================= */}
            {loading && (
              <div className="absolute inset-0 bg-gray-300/80 backdrop-blur-[2px] flex items-center justify-center rounded-[8px] z-10 transition-all duration-300">
                <div className="flex flex-col items-center gap-2">
                  {/* Spinner */}
                  <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-sm text-gray-700 font-medium">
                    Predicting...
                  </p>
                </div>
              </div>
            )}

            {/* =========================
                CHANGED:
                content always stays mounted
                only opacity changes
                prevents layout jump
            ========================= */}
            <div
              className={`transition-all duration-300 ${
                loading ? "opacity-60" : "opacity-100"
              }`}
            >
              <div>
                <p
                  className="text-[16px] text-center"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              </div>

              <div>
                <p className="text-[16px] text-center">
                  Prediction Percentage:{" "}
                  <b className="text-[20px]">
                    {predPercentage == null
                      ? "---"
                      : predPercentage >= 50.0
                        ? predPercentage
                        : 100 - predPercentage}
                    %
                  </b>
                </p>
              </div>

              <div>
                <p className=" text-center text-[12px] text-gray-600">
                  Between 0 - 100{" "}
                  <b>{predPercentage == null ? "---" : predPercentage}%</b>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-fit flex items-center justify-between">
            <p className="text-[14px] text-gray-600 select-none">v2.0</p>

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
