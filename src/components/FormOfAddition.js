import React,{useState} from 'react'

export default function FormOfAddition(props) {
    document.title=`${props.pageTitle}  `
    let [text,setText]=useState('');
    let sumTheNum=()=>{
        let con=text.toUpperCase();
        setText(con);
        props.showAlert("success","Text converted to uppar case!");
    }

    let onchange=(event)=>{
        setText(event.target.value);
    }

    // props.setProgress(100);
  return (
    <div>
        <br/><br/>
        <h2><b>Enter your text</b></h2>
        <br />
        <textarea onChange={onchange} style={{backgroundColor:props.mode==='dark'?'rgb(33, 37, 41)':'white',border:props.mode==='dark'?'2px solid white':'2px solid black',color:props.mode==='dark'?'white':'black'}} value={text} cols='100' rows='8'/>
        <br /><br />

        <button disabled={text.length===0} className={`btn btn-${props.btn}`} onClick={sumTheNum}>UPPER CASE</button>

        <h2>Preview</h2>
        <p>{text.length===0?"Nothing to preview":text}</p>
    </div>
    )
}
