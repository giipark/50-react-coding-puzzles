import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounterPage from "./pages/counter/CounterPage"
import TodoListPage from "./pages/todo/TodoListPage";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<CounterPage/>}></Route>
                    <Route path="/counter" element={<CounterPage/>}/>
                    <Route path="/todo-list" element={<TodoListPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
