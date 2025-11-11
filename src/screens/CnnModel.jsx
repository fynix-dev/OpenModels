import { useState } from 'react'
import * as tf from '@tensorflow/tfjs';

const CnnModel = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [pred, setPred] = useState([]);
  const labels = ['Airplane', 'Automobile', 'Bird', 'Cat', 'Deer', 'Dog', 'Frog', 'Horse', 'Ship', 'Truck'];

  const predictImage = async() => {
    document.getElementById('predict-btn').innerText = 'Predicting...';

    const imgElement = document.getElementById('img-container');;
    const imageTensor = tf.browser.fromPixels(imgElement);
    const resizedImage = tf.image.resizeBilinear(imageTensor, [32, 32]);
    const normalizedImage = resizedImage.div(255.0);
    const finalImageTensor = normalizedImage.expandDims(0);

    const model = await tf.loadLayersModel('/models/model_cnn/model.json');
    const prediction = model.predict(finalImageTensor);
    const resArray = await prediction.array();
    const res = resArray[0].indexOf(Math.max(...resArray[0])) //tf.argMax(prediction, -1).dataSync()[0];

    //loop to find the 3 highest predictions
    let topPredictions = [];
    let predictions = resArray[0].slice(); //copy of predictions array
    for (let i = 0; i < 3; i++) {
        //Finds the max value as stores in a variable
        let maxValue = Math.max(...predictions);

        //Remove this value from array
        predictions.splice(predictions.indexOf(maxValue), 1);
        
        //Push max value to topPredictions
        topPredictions.push(maxValue);
    }

    //assign topPredictions to the labels
    let topPredictionsWithLabels = [];
    topPredictions.forEach((value) => {
        let dict = {};
        const index = resArray[0].indexOf(value);

        dict['label'] = labels[index];
        dict['value'] = JSON.stringify(value * 100).slice(0,5) + '%';

        topPredictionsWithLabels.push(dict);
    })
        
    setPred(topPredictionsWithLabels)
    console.log(topPredictionsWithLabels)

    imageTensor.dispose();
    resizedImage.dispose();
    normalizedImage.dispose();
    finalImageTensor.dispose();
    model.dispose()

    document.getElementById('predict-btn').innerText = 'Predict';
  }

  return (
    <section className='w-full h-screen flex items-center justify-center bg-[#ede7e6]'>
        <div className='container'>
            <h1 className='h1'>CNN Image Classifier</h1>
            <div className='w-full h-auto flex items-center justify-center'>
                <input type="file" className='hidden' id='image-input' onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))} />
                <label htmlFor="image-input" className='w-auto h-auto pl-[12px] pr-[12px] pt-[8px] pb-[8px] border-2 border-black rounded-[8px] cursor-pointer hover:bg-black hover:text-white '>Upload Image</label>
            </div>
            { imageUrl !== '' &&
                (
                    <div className='w-[200px] h-auto rounded-[8px]'>
                        { imageUrl !== '' && 
                            (<img id='img-container' className='rounded-[8px] mx-auto ' src={imageUrl} alt="uploaded" />)
                        }
                    </div>
                )
            }
            <button id='predict-btn' className='w-full h-auto pl-[12px] pr-[12px] pt-[8px] pb-[8px] border-2 border-black bg-black text-white font-medium rounded-[8px] cursor-pointer' onClick={() => predictImage()}>Predict</button>

            <div className='w-full h-auto flex flex-col items-center justify-center gap-[8px]'>
                <p className='text-[20px] font-medium'>Prediction</p>
                <div className='w-full h-auto flex flex-col items-center justify-center '>
                    {
                        pred.map((item, i) => (
                            <p key={i} className='text-[#5e5e5e] text-[18px] font-medium nth-[1]:text-[20px] nth-[1]:font-bold nth-[1]:text-black'>{item['label']} ({item['value']})</p>
                        ))
                    }
                </div>
            </div>

            <div className='w-full h-fit flex items-center justify-between'>
                <p className='text-[14px] text-gray-600 select-none'>v1.0</p>
                <p className='text-[14px] text-gray-600 select-none'>Made by Aadi</p>
            </div>
        </div>
    </section>
  )
}

export default CnnModel