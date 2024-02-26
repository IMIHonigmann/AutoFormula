import React, { useState } from 'react';
import './index.css';
import { BlockMath, InlineMath } from 'react-katex';


let stepGlobal = 0;

function MyComponent() {

  const [Da, setDa] = useState(0);
  const [pe, setPe] = useState(0);
  const [K, setK] = useState(0);
  const [S, setS] = useState(0);
  const [v, setV] = useState(0);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [t, setT] = useState(0);

  const [step, setStep] = useState(0.5);
  stepGlobal = step;

  // todo scale the site down on mobile
  // fix dot removes the input for some reason on mobile
  const calculate = () => {
    setT((Da * pe) / (20 * (K / S) * v + pe) + c1 + c2);
  }

  return (
    <>
      <div className="blockmath">
        <BlockMath math={'t=\\frac{Da \\times pe}{20 \\times \\frac{K}{S} \\times v + pe} + c_{1} + c_{2}'} />
        <BlockMath math={`t=\\frac{${Da} mm \\times ${pe} N/mm^2}{\\color{${Number.isNaN(t) ? 'red' : 'none'}}{20 \\times \\frac{${K} N/mm^2}{${S}} \\times ${v} + ${pe} N/mm^2}} + ${c1} mm + ${c2} mm`} />
      <h2 className={Number.isNaN(t) ? 'resultFailed' : 'result'}>
        Result: <br/>
        t = {t} mm <br/>
      </h2>
        {Number.isNaN(t) && 'Cannot divide by zero'}
      </div>

      <p>
      <input
          type='range'
          step={0.5}
          value={step}
          onChange={(e) => setStep(parseFloat(e.target.value))}
          min={0.5}
          max={5}
        />
        <input 
          type='number'
          step='any'
          value={step}
          onChange={(e) => {setStep(parseFloat(e.target.value))}}
        />
        Step
        <br/>
        _________________________________________________________________________________________________________
      </p>
      <span className='inputs'>

      {numberInput('mm', 'Da', Da, setDa)}
      {numberInput('N/mm^2', 'pe', pe, setPe)}
      {numberInput('N/mm^2', 'K', K, setK)}
      {numberInput('', 'S', S, setS)}
      {numberInput('', 'v', v, setV)}
      {numberInput('mm', 'c_1', c1, setC1)}
      {numberInput('mm', 'c_2', c2, setC2)}
      </span>
      <button onClick={calculate}>
        Calculate!
      </button>
    </>
  );
}

function numberInput(unit: string, variableName: string, value: number, setter: (value: number) => void) {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value));
  };

  return (
    <>
      <input
          id={variableName+'Range'}
          type="range"
          step={stepGlobal}
          value={value}
          min={0}
          max={500}
          onChange={onChangeHandler}
        />
      <input
          id={variableName+'Input'}
          type="number"
          step="any"
          value={value}
          min={0}
          max={500}
          onChange={onChangeHandler}
        />
          <InlineMath math={`${unit} = ${variableName}`} />
        <br />
    </>
  );
}

export default MyComponent;