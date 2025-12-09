import { useEffect, useState } from "react";
import "./css/Counter.css"

const LIMIT_COUNT = 100;

function Counter() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    const [prevCount, setPrevCount] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const [historyVisible, setHistoryVisible] = useState(false);

    const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (Number.isNaN(value)) {
            setStep(0);
            return;
        }

        const clamped = Math.min(Math.max(value, 0), LIMIT_COUNT);
        setStep(clamped);
    }

    const handleIncrement = () => {
        setCount((prev) => {
            return Math.min(prev + step, LIMIT_COUNT);
        });
    }

    const handleDecrement = () => {
        setCount((prev) => {
            return Math.max(prev - step, 0);
        });
    }

    const handleReset = () => {
        setCount(0);
        setHistory([]);
        setPrevCount(0);
    }

    useEffect(() => {
        if (prevCount === null) {
            setPrevCount(count);
            return;
        }

        if (prevCount !== count) {
            setHistory((prev) => [...prev, count]);
            setPrevCount(count);
            setHistoryVisible(true);
        }
    }, [count, prevCount])

    return (
        <div className="counter-wrapper">
            <div className="counter-main">
                <p>Count: {count}</p>

                <div>
                    <label>
                        Step:&nbsp;
                        <input
                            type="number"
                            value={step}
                            onChange={handleStepChange}
                        />
                    </label>
                </div>

                <div className="button-group">
                    <button onClick={handleIncrement}>+</button>
                    <button onClick={handleDecrement}>-</button>
                </div>

                <div className="reset-group">
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>

            {historyVisible && (
                <div className="counter-history">
                    <h4>History</h4>
                    <ul>
                        {history.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Counter;