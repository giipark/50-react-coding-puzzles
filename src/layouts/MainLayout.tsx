import { Link, Outlet } from "react-router-dom";
import "./css/MainLayout.css"

const MainLayout = () => {
    return (
        <div className="layout">
            <aside className="sidebar">
                <h3>Project</h3>
                <ol>
                    <li><Link to="/counter">Simple Counter App</Link></li>
                    <li><Link to="/todo-list">Dynamic List of Items with Strikethrough</Link></li>
                </ol>
            </aside>

            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}

export default MainLayout;