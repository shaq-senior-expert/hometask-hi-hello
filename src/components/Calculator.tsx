import { useEffect, useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const Calculator = () => {
  const [accValue, setAccValue] = useState<number | null>(null);
  const [screenValue, setScreenValue] = useState('0');
  const [currentOperator, setCurrentOperator] = useState(null);
  const [expectsOperand, setExpectsOperand] = useState(false);

  const isScreenClear = screenValue === '0';

  const operate = (operator: string, accValue: number, inputValue: number) => {
    switch (operator) {
      case '+':
        return accValue + inputValue;
      case '-':
        return accValue - inputValue;
      case 'x':
        return accValue * inputValue;
      case '/':
        return accValue / inputValue;
      case '=':
        return inputValue;
      default:
        return null;
    }
  };

  const addDecimalPoint = () => {
    if (expectsOperand) {
      setScreenValue('0.');
    } else {
      if (!screenValue.includes('.')) setScreenValue(screenValue + '.');
    }
    setExpectsOperand(false);
  };

  const percentage = () => {
    setScreenValue(String(parseFloat(screenValue) / 100));
  };

  const reverseSign = () => {
    setScreenValue(String(-parseFloat(screenValue)));
  };

  const allClear = () => {
    setAccValue(null);
    setScreenValue('0');
    setCurrentOperator(null);
    setExpectsOperand(false);
  };

  const clearScreen = () => {
    setScreenValue('0');
  };

  const clearLastDigit = () => {
    if (screenValue !== '0')
      if (screenValue.length > 1) setScreenValue('0');
      else {
        setScreenValue(screenValue.substring(0, screenValue.length - 1));
      }
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      clearLastDigit();
    }
  };

  const handleClickFunctionKey = (value: string | number) => {
    switch (value) {
      case 'AC':
        allClear();
        break;
      case 'C':
        clearScreen();
        break;
      case '+/-':
        reverseSign();
        break;
      case '%':
        percentage();
        break;
      case '.':
        addDecimalPoint();
        break;
    }
  };

  const handleClickNumericKey = (value: string | number) => {
    if (expectsOperand) {
      setScreenValue(String(value));
      setExpectsOperand(false);
    } else
      setScreenValue(screenValue === '0' ? String(value) : screenValue + value);
  };

  const handleClickOperator = (operator: any) => {
    const inputValue = parseFloat(screenValue);
    if (accValue === null) {
      setAccValue(inputValue);
    } else {
      if (currentOperator) {
        const resultValue = operate(currentOperator, accValue, inputValue);
        setAccValue(resultValue);
        setScreenValue(String(resultValue));
      }
    }
    setExpectsOperand(true);
    setCurrentOperator(operator);
  };

  const handleActionToPerform = (value: string | number, keyType: any) => {
    switch (keyType) {
      case 'fx':
        handleClickFunctionKey(value);
        break;
      case 'numeric':
        handleClickNumericKey(value);
        break;
      case 'operator':
        handleClickOperator(value);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [screenValue]);

  return (
    <div id="calculator-view" className={'flex column jc-center ai-center'}>
      <div id="viewport" className={'flex column jc-sp-between ai-center'}>
        <Display value={screenValue} />
        <Keypad
          actionToPerform={handleActionToPerform}
          allClear={isScreenClear}
        />
      </div>
    </div>
  );
};

export default Calculator;
