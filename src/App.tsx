import './App.css'
import {Slider} from "./Slider.tsx";

function App() {
  return (<div className="flex">
    <Slider />
    <Slider width={300} />
    </div>)
}

export default App
