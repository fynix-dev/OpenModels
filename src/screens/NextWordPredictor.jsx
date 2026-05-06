import { div, input } from "@tensorflow/tfjs";
import { Send } from "../utils";
import { useState } from "react";

const NextWordPredictor = () => {
  const [data, setData] = useState([]);
  const [predicting, setPredicting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictedWords, setPredictedWords] = useState("Hello");
  const colors = [
    ["#5cdb48", "#72f55d"],
    ["#f2e635", "#faef52"],
    ["#eb5949", "#f56858"],
  ];

  const wordsToPredict = 1;

  const getOnlyPredictedWords = (text) => {
    const words = text.split(" ");
    const res = words.slice(words.length - wordsToPredict).join(" ");
    setPredictedWords(res);
  };

  const predictNextWord = async (inputText) => {
    setData([]);

    setPredicting(true);
    setLoading(true);

    const res = await fetch(
      "https://technicalsquad-next-word-predictor.hf.space/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          words_to_predict: wordsToPredict,
        }),
      },
    );

    const resJson = await res.json();
    setData(resJson);
    getOnlyPredictedWords(resJson.predicted_text);

    setPredicting(false);
    setLoading(false);
  };
  return (
    <main>
      <div className="w-full h-full min-h-screen bg-bg flex items-center justify-center p-[20px] md:p-[0px]">
        <div className="w-fit min-w-[45%] md:max-w-[70%] container">
          <h1 className="h1">Next Word Predictor</h1>

          <div className="w-full h-max-[60px] h-[45px] flex items-center border-2 border-black rounded-[8px]">
            <input
              className="focus:outline-0 rounded-[8px] w-full h-full pl-[8px]"
              id="review-input"
              placeholder="Enter the Sentence"
            ></input>
            <div
              onClick={() =>
                predictNextWord(document.getElementById("review-input").value)
              }
              className="w-fit p-[8px] h-full flex items-center justify-center bg-black cursor-pointer"
            >
              <img src={Send} alt="sent" />
            </div>
          </div>

          <div className="w-full h-full flex justify-center md:flex-row flex-col items-stretch gap-[8px] p-[12px]">
            {!predicting && data.length === 0 && (
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
                <span className="text-[20px] font-bold text-black">words</span>
              </p>
            )}

            {loading && (
              <p className="w-full text-center text-wrap font-medium text-[13px] text-gray-500">
                Predicting next words...
              </p>
            )}
            <div className="flex-1 h-full flex items-start justify-center flex-col">
              <div className="w-full h-full flex self-stretch flex-col">
                {data.length !== 0 && (
                  <p className="w-full text-center text-wrap font-bold text-[16px] mb-[8px]">
                    Predicted Word
                  </p>
                )}
                {data.length !== 0 && (
                  <p className="w-full text-center text-wrap font-bold text-[20px]">
                    {predictedWords}
                  </p>
                )}
                {data.length !== 0 && (
                  <p className="w-full text-center text-wrap font-medium text-gray-500 text-[13px]">
                    {data.predicted_text}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 ">
              {data.length !== 0 && (
                <p className="w-full text-center text-wrap font-bold text-[16px]">
                  Prediction Details
                </p>
              )}
              <div className="flex flex-wrap md:flex-nowrap md:flex-row gap-[8px]">
                {data.predictions?.map((item, i) => (
                  <div
                    key={i}
                    className="border-1 border-gray-300 rounded-[8px] p-[8px] flex flex-col items-center justify-around gap-[12px] flex-1"
                  >
                    {item.top_predictions.map((pred, j) => (
                      <div
                        key={j}
                        className="p-[4px] rounded-[8px] text-[12px] text-nowrap w-full text-center"
                        style={{
                          background: `linear-gradient(90deg, ${colors[j][0]} 10%, ${colors[j][1]} 100%)`,
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
