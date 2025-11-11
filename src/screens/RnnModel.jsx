import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import { Vocabs } from '../constants/index'
import { Send } from '../utils';

const RnnModel = () => {
  const [prediction, setPrediction] = useState([]);

  const prepareInput = (input) => {
    const cleanedText = input.replace(/[!"#$%&'()*+,--./:;<=>?@[\]^_`{|}~]/g, '');;
    const list = cleanedText.toLowerCase().split(' ');
    const tensor = [];

    list.forEach(element => {
      if (Vocabs.includes(element)) {
        tensor.push(Vocabs.indexOf(element));
      }else{
        tensor.push(Vocabs.indexOf('[UNK]'))
      }
    });

    const extraPadding = 100 - tensor.length;
    if (extraPadding < 0){
      return tensor.slice(0, 100)
    }else{
      const paddingArray = []
      for (let i = 0; i < extraPadding; i++) {
        paddingArray.push(0)
      }
      tensor.push(...paddingArray);

      return tensor;
    }
    
  }

  const predict = async(inputText) => {
    const labels = ['Negative', 'Positive']
    const input = prepareInput(inputText)
    const model = await tf.loadLayersModel(process.env.PUBLIC_URL + '/models/model_rnn/model.json');
    const inputTensor = tf.tensor([input], [1, 100], 'int32');
    const res = model.predict(inputTensor);
    const resArray = await res.array();

    const predDict = [];
    predDict.push({'label': labels[resArray[0].indexOf(Math.max(...resArray[0]))], 'value': Math.max(...resArray[0]).toFixed(3) * 100}, {'label': labels[resArray[0].indexOf(Math.min(...resArray[0]))], 'value': Math.min(...resArray[0]).toFixed(3) * 100});
    setPrediction(predDict);
    model.dispose();

  }

  return (
    <section className='w-full h-screen flex items-center justify-center bg-[#ede7e6]'>
      <div className='container'>
        <h1 className='h1'>Movie Review Tone Predictor</h1>

        <div className='w-full h-max-[60px] h-[45px] flex items-center border-2 border-black rounded-[8px]'>
          <input className="focus:outline-0 rounded-[8px] w-full h-full pl-[8px]" id="review-input" placeholder='Enter the Movie Review'></input>
          <div 
            onClick={() => predict(document.getElementById('review-input').value)}
            className='w-fit p-[8px] h-full flex items-center justify-center bg-black cursor-pointer'>
            <img src={Send} alt="sent" />
          </div>
        </div>

        <div className='w-full h-auto'>
          <div className='w-full h-auto flex items-center justify-center flex-col gap-[4px]'>
            {
              prediction.map((item, index) => (
                <div key={index} className='nth-[1]:font-bold font-medium nth-[1]:text-black text-gray-800'>
                  <h2 className='text-[20px]'>{item['label']} - ({item['value']}%)</h2>
                </div>
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

export default RnnModel