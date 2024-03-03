import './App.css';
import Navbar from './components/Navbar';
import FormOfAddition from './components/FormOfAddition';
import Theme from './components/Theme';
import React,{ useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AddNews from './components/AppNews';
import LoadingBar from 'react-top-loading-bar';



function App() {
  const [mode,setMode]=useState("light");
  const [theme,setTheme]=useState({
    color:"black",
    backgroundColor:"white"
})
let modeChanged=()=>{
  if(mode==="light" || mode==="primary" || mode==="success" || mode==="danger" || mode==="warning" || mode==="")
  {
    setMode("dark");
    document.body.style.backgroundColor='#212529';
    document.body.style.color='white';
    showAlert("success","Dark mode has been enabled!");
    setFnt("fnt");
    setBtn("primary");
    setTheme({
      color:"white",
      backgroundColor:"#212529"
    });
    document.title="Theme Customize - Dark mode on";
  }
  else if(mode==="dark")
  {
    setMode("light")
    document.body.style.backgroundColor='white';
    document.body.style.color='black';
    showAlert("info","Dark mode has been disabled!");
    setFnt("fntb");
    setBtn("primary");
    document.title="Theme Customize - Light mode on";
    setTheme({
      color:"black",
      backgroundColor:"white"
    });
  }
}

const [fnt,setFnt]=useState("fntb");

const [alert,setAlert]=useState(null);
let showAlert = (type,message)=>{
  setAlert({
    message:message,
    type:type
  })
  setTimeout(()=>{
  showAlert(null);
  },2000)
}


let [btn,setBtn]=useState("primary");
let setColorP=()=>{
  document.body.style.backgroundColor="blue";
  setMode("primary");
  setBtn("primary");
  document.body.style.color='white';
  setFnt("fnt");
}

let setColorG=()=>{
  document.body.style.backgroundColor="green";
  setBtn("success");
  setMode("success");
  document.body.style.color='white';
  setFnt("fnt");
}

let setColorR=()=>{
  document.body.style.backgroundColor="red";
  setBtn("danger");
  setMode("danger");
  document.body.style.color='white';
  setFnt("fnt");
}

let setColorY=()=>{
  document.body.style.backgroundColor="yellow";
  setBtn("warning");
  setMode("warning");
  document.body.style.color='black';
  setFnt("fntb");
}
const [progress,setProg]=useState(0);
let setProgress=(progress)=>{
    setProg(progress);
}

  return (
    //Router is use to navigate from one page to another without reloading
    //{} is the syntax of USX to use JS under HTML
    <Router>
    <div className="App">
    <LoadingBar 
      color='red'
      height={3}
      progress={progress}
      shadow='true'
        />
      <Navbar nav1="Home" nav2="Theme" nav3="News" fnt={fnt} setColorP={setColorP} setColorG={setColorG} setColorR={setColorR}  setColorY={setColorY} alert={alert} showAlert={showAlert} modeChanged={modeChanged} mode={mode}/>
      <Alert alert={alert}/>
      {/* Loading bar display whenever user navigated  */}
      
      <br/><br/>

        {/* Routes and Route are part of Router */}
        <Routes>
        {/* Exact keywords is required for matching exact same path */}
            <Route exact path='/theme' element={<Theme theme={theme} pageTitle="Theme Customization"  setProgress={setProgress}/>} />
            <Route exact path='/' element={<FormOfAddition modeChanged={modeChanged}  mode={mode} showAlert={showAlert} btn={btn} pageTitle="TextUtils"  setProgress={setProgress}/>} />
            <Route exact path='/news' element={<AddNews key="general" category="general" title="General"  setProgress={setProgress} />}/>
            <Route exact path='/business' element={<AddNews key="business" category="business" title="Business" setProgress={setProgress}  />}/>
            <Route exact path='/entertainment' element={<AddNews key="entertainment" category="entertainment" title="Entertainment" setProgress={setProgress}  />}/>
            <Route exact path='/health' element={<AddNews key="health" category="health" title="Health" setProgress={setProgress}  />}/>
            <Route exact path='/science' element={<AddNews key="science" category="science" title="Science" setProgress={setProgress}  />}/>
            <Route exact path='/sports' element={<AddNews key="sports" category="sports" title="Sports" setProgress={setProgress}  />}/>
            <Route exact path='/technology' element={<AddNews key="technology" category="technology" title="Technology" setProgress={setProgress}  />}/>
        </Routes>
      
    </div>
    </Router>
  );
}

export default App;
