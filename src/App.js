import './App.css';
import Multipad from './containers/Multipad/Multipad'
import trackList from './trackList'

function App() {
  return (
    <div className="app">
      <header>
        MultiPad Looper v1.01
      </header>
      <Multipad pads={trackList} />
      <footer>Created by Yaron Funis &#169;</footer>
    </div>
  );
}
export default App;
