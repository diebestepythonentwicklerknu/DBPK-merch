import "./App.scss";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

function App() {
  return (
      <div className="wrapper">
        <div className="wrapper__container">
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
        </div>
      </div>
  );
}

export default App;
