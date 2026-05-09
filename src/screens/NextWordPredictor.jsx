import { Send } from "../utils";
import { useState } from "react";

const NextWordPredictor = () => {
  // =========================
  // CHANGED:
  // data is now null initially
  // cleaner conditional rendering
  // =========================
  const [data, setData] = useState(null);

  const [predicting, setPredicting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [predictedWords, setPredictedWords] = useState("Hello");

  // =========================
  // CHANGED:
  // improved gradients
  // =========================
  const colors = [
    ["#22c55e", "#4ade80"],
    ["#eab308", "#fde047"],
    ["#ef4444", "#f87171"],
  ];

  const wordsToPredict = 1;

  const getOnlyPredictedWords = (text) => {
    const words = text.split(" ");

    const res = words.slice(words.length - wordsToPredict).join(" ");

    setPredictedWords(res);
  };

  const predictNextWord = async (inputText) => {
    // =========================
    // CHANGED:
    // prevent empty request
    // =========================
    if (!inputText.trim()) return;

    setPredicting(true);

    // =========================
    // CHANGED:
    // loading starts
    // =========================
    setLoading(true);

    try {
      const res = await fetch(
        "https://technicalsquad-next-word-predictor.hf.space/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
            words_to_predict: wordsToPredict,
          }),
        },
      );

      const resJson = await res.json();

      setData(resJson);

      getOnlyPredictedWords(resJson.predicted_text);
    } catch (error) {
      console.log(error);
    } finally {
      // =========================
      // CHANGED:
      // loading ends
      // =========================
      setPredicting(false);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="w-full h-full min-h-screen bg-bg flex items-center justify-center p-[20px] md:p-[0px]">
        <div className="w-fit min-w-[45%] md:max-w-[70%] container">
          <h1 className="h1">Next Word Predictor</h1>

          <div className="w-full h-max-[60px] h-[45px] flex items-center border-2 border-black rounded-[8px] overflow-hidden">
            <input
              className="focus:outline-0 rounded-[8px] w-full h-full pl-[8px]"
              id="review-input"
              placeholder="Enter the Sentence"
            />

            {/* =========================
                CHANGED:
                button instead of div
                disabled while loading
            ========================= */}
            <button
              onClick={() =>
                predictNextWord(document.getElementById("review-input").value)
              }
              disabled={loading}
              className={`w-fit p-[8px] h-full flex items-center justify-center transition-all duration-200
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {/* =========================
                  CHANGED:
                  animate icon while loading
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
              relative wrapper for overlay
          ========================= */}
          <div className="relative w-full h-full flex justify-center md:flex-row flex-col items-stretch gap-[8px] p-[12px]">
            {/* =========================
                CHANGED:
                overlay only when data exists
                prevents ugly first load
            ========================= */}
            {loading && data && (
              <div className="absolute inset-0 bg-gray-300/80 backdrop-blur-[2px] flex items-center justify-center rounded-[8px] z-10 transition-all duration-300">
                <div className="flex flex-col items-center gap-2">
                  {/* Spinner */}
                  <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-sm text-gray-700 font-medium">
                    Predicting next word...
                  </p>
                </div>
              </div>
            )}

            {/* =========================
                CHANGED:
                smooth fade while loading
            ========================= */}
            <div
              className={`w-full flex justify-center md:flex-row flex-col items-stretch gap-[8px] transition-all duration-300 ${
                loading && data ? "opacity-60" : "opacity-100"
              }`}
            >
              {/* =========================
                  CHANGED:
                  initial message shown
                  ONLY when:
                  no data + not loading
              ========================= */}
              {!data && !loading && (
                <p className="w-full text-center text-wrap font-medium text-gray-500 text-[16px]">
                  Enter a{" "}
                  <span className="text-[20px] font-bold text-black">
                    sentence
                  </span>{" "}
                  to{" "}
                  <span className="text-[20px] font-bold text-black">
                    predict
                  </span>{" "}
                  the next{" "}
                  <span className="text-[20px] font-bold text-black">
                    words
                  </span>
                </p>
              )}

              {/* =========================
                  CHANGED:
                  first-time loading UI
              ========================= */}
              {loading && !data && (
                <div className="w-full flex flex-col items-center justify-center py-[20px] gap-[12px]">
                  {/* Spinner */}
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-gray-600 font-medium text-[14px]">
                    Predicting next word...
                  </p>
                </div>
              )}

              {/* =========================
                  MAIN CONTENT
              ========================= */}
              {data && (
                <>
                  {/* LEFT SIDE */}
                  <div className="flex-1 h-full flex items-start justify-center flex-col">
                    <div className="w-full h-full flex self-stretch flex-col">
                      <p className="w-full text-center text-wrap font-bold text-[16px] mb-[8px]">
                        Predicted Word
                      </p>

                      <p className="w-full text-center text-wrap font-bold text-[20px]">
                        {predictedWords}
                      </p>

                      <p className="w-full text-center text-wrap font-medium text-gray-500 text-[13px]">
                        {data.predicted_text}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex-1">
                    <p className="w-full text-center text-wrap font-bold text-[16px]">
                      Prediction Details
                    </p>

                    <div className="flex flex-wrap md:flex-nowrap md:flex-row gap-[8px]">
                      {data?.predictions?.map((item, i) => (
                        <div
                          key={i}
                          className="border border-gray-300 rounded-[8px] p-[8px] flex flex-col items-center justify-around gap-[12px] flex-1"
                        >
                          {item.top_predictions.map((pred, j) => (
                            <div
                              key={j}
                              // =========================
                              // CHANGED:
                              // fixed gradients
                              // =========================
                              className="p-[6px] rounded-[8px] text-[12px] text-nowrap w-full text-center text-black font-medium overflow-hidden shadow-sm"
                              style={{
                                backgroundImage: `linear-gradient(90deg, ${colors[j][0]} 0%, ${colors[j][1]} 100%)`,
                              }}
                            >
                              <span className="text-[12px]">{pred.word}</span> -{" "}
                              <span className="font-bold text-[14px]">
                                {pred.probability}%
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
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

export default NextWordPredictor;
