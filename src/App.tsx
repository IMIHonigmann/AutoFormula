import React, { useEffect, useState } from 'react';
import './index.css';
import { BlockMath } from 'react-katex';

function MyComponent() {

  const [Da, setDa] = useState(0);
  const [pe, setPe] = useState(0);
  const [k, setK] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(0);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [t, setT] = useState(0)

  const calculate = () => {
    setT((Da * pe) / (2 * (k / s) * v + pe) + c1 + c2);
  }

  return (
    <>
      <div className="blockmath">
        <BlockMath math={'t=\\frac{Da \\times pe}{2 \\times \\frac{k}{s} \\times v + pe} + c_{1} + c_{2}'} />
        <BlockMath math={`t=\\frac{${Da} \\times ${pe}}{\\color{${Number.isNaN(t) ? 'red' : 'none'}}{2 \\times \\frac{${k}}{${s}} \\times ${v} + ${pe}}} + ${c1} + ${c2}`} />
      <h2 className={Number.isNaN(t) ? 'resultFailed' : 'result'}>
        Result: <br/>
        t = {t} <br/>
      </h2>
        {Number.isNaN(t) && 'Cannot divide by zero'}
      </div>

      <span className='inputs'>
      {numberInput('Da', Da, setDa)}
      {numberInput('pe', pe, setPe)}
      {numberInput('k', k, setK)}
      {numberInput('s', s, setS)}
      {numberInput('v', v, setV)}
      {numberInput('c1', c1, setC1)}
      {numberInput('c2', c2, setC2)}
      </span>
      <button onClick={calculate}>
        Calculate!
      </button>
    </>
  );
}

function numberInput(variableName: string, value: number, setter: (value: number) => void) {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value));
  };

  return (
    <>
      <input
          id={variableName+'Input'}
          type="number"
          step="any"
          value={value}
          onChange={onChangeHandler}
        />
        = <label htmlFor={variableName+'Input'}> {variableName} </label>
        <br />
    </>
  );
}

export default MyComponent;