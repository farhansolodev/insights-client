import logo from './logo.svg';
import Leftbar from './admin_left';
import MainCont from './main';
import './App.css';

function App() {
  return (
    <div className="admin_container">
      <Leftbar></Leftbar>
      <MainCont></MainCont>
    </div>
  );
}

export default App;
