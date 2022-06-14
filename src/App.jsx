import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserForm } from "../components/UserForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;
