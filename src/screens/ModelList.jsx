import { useNavigate } from "react-router";

const ModelList = () => {
  const navigate = useNavigate();
  const details = [
    {
      id: 1,
      name: "Movie Tone Predictor",
      description:
        "A simple RNN based model to predict the tone of the feedback you give",
      nav: "/rnn",
      size: 0.0,
      version: 1.0,
    },
    {
      id: 2,
      name: "Image Classifier",
      description:
        "A simple CNN based model that classifies the image you upload into few categories like truck, automobile, plane, hoarse, etc",
      nav: "/cnn",
      size: 0.0,
      version: 1.0,
    },
    {
      id: 3,
      name: "Next word predictor",
      description:
        "A model that can predict the next word. Made using Natural Language Processing(NLP). Connected to an API where the model is running",
      nav: "/next-word-predictor",
      size: 58.2,
      version: 1.0,
    },
    {
      id: 4,
      name: "Spam message detector",
      description:
        "A model that can classify the message into SPAM or HAM. Built using Natural Language Processing(NLP) with LSTM layer. (Comming Soon)",
      nav: "/", // Note: You might want to update this to a unique path
      size: 3.2,
      version: 1.0,
    },
  ];

  return (
    <section className="w-full min-h-screen p-4 bg-bg text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Model Lists</h1>

      {/*
        Grid Layout:
        - grid-cols-1: 1 column on mobile
        - sm:grid-cols-2: 2 columns on small screens (optional, remove if you want 1 until large)
        - lg:grid-cols-2: Force 2 columns on large screens
        - gap-6: Spacing between cards
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        {details.map((element) => (
          <div
            key={element.id}
            className=" container h-64 p-5 flex flex-col justify-between cursor-pointer
            "
            onClick={() => navigate(element.nav)}
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {element.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                {element.description}
              </p>
            </div>

            <div className="flex w-full justify-between text-xs font-medium text-gray-500 border-t pt-3 mt-2">
              <span>Version v{element.version}</span>
              <span>Size {element.size}mb</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModelList;
