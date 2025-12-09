import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounterPage from "./pages/Counter/CounterPage"

function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/counter" element={<CounterPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
