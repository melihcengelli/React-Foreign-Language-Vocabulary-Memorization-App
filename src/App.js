import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ParticlesBg from 'particles-bg'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import logo from './melihcengelli.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 25,
  boxShadow: 24,
  p: 4,
};

function App() {
  const [verbs,setVerbs] = useState([{id:1,verb:"Pencil",meansto:"Kalem"},{id:2,verb:"Eraser",meansto:"Silgi"},{id:3,verb:"Brush",meansto:"Fırça"},{id:4,verb:"Desk",meansto:"Sıra"},{id:5,verb:"School",meansto:"Okul"}])

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setVisibility(true);
  }

  const handleClose = () => {
    setOpen(false);
    setVisibility(false)
  }



  const [myverb, setMyVerb] = useState("")
  const newverb = (event) => {
    setMyVerb(event.target.value)
  }

  const [mymeans, setMyMeans] = useState("")
  const newmeans = (event) => {
    setMyMeans(event.target.value)
  }
  
  const [idcount,setIdCount] = useState(6)

  const addbutton = () => {
    console.log("verb: "+myverb+" means: "+mymeans)
    setVerbs([...verbs,{id:idcount,verb:myverb,meansto:mymeans}])
    setIdCount(idcount+1)
    console.log(idcount)
  }

  const discardbutton = (id) => {
    for (let i = 0; i < verbs.length; i++) {
      if (verbs[i].id==id) {
        setVerbs(verbs.filter(item => item.id!==id))
      }
    }
  }


  const [randomnumber,setRandomNumber] = useState(0);

  const [visibility,setVisibility] = useState(false);
  const [verbvisibility,setVerbVisibility]=useState(false);


  return (
    
    <div className="App">
      { visibility ? <div></div> :

      <div id='main'>
        <img src={logo} alt="Melih Cengelli" id='logo'></img>
        <div id="boxbackground">
          <div id="mainbox">
            <div id="inputs">
              <TextField id="outlined-basic" label="Word" variant="outlined" onChange={newverb} />
              <TextField id="outlined-basic" label="Means to" variant="outlined" onChange={newmeans} />
              <Button variant="contained" onClick={addbutton}>Add</Button>
            </div>
          </div>
        </div>
      </div>
      }
      { visibility ? <div></div> : <div id="start" onClick={handleOpen}><PlayCircleFilledWhiteIcon fontSize='large' /><br/>START</div>}

      { visibility ? <div></div> :
      <div id="verbs">
          {verbs.map((item)=>{
            return (
              <div key={item.id} id="verb"><div id="textarea"><div id="insidetext">Word</div><p id="verbtext">{item.verb}</p><p id="insidetext">Means to</p><p id="verbmeans">{item.meansto}</p><Button variant="contained" onClick={() => discardbutton(item.id)}>Discard</Button></div></div>
            )
          })}
        <ParticlesBg type="lines" bg={true} />

      </div>
      }
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modalinside">
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {verbs.length > 0 ? verbs[randomnumber].verb : <div id="buttonbg2">There is no verb in your list.</div> }
            </Typography>
            { verbs.length > 0 ? <div>
             { verbvisibility  ? <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {verbs.length > 0 ? verbs[randomnumber].meansto : ""}
            </Typography> : <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {'*'.repeat(verbs[randomnumber].meansto.split("").length)}
            </Typography> } 
            </div> : <div></div> }
          </div>
          { verbs.length > 0 ?
          <div id="modalbuttons">
            <div id="buttonbg2"><CheckCircleOutlineIcon fontSize='large' onClick={() => {
              for (let i = 0; i < verbs.length; i++) {
                  if (verbs[i].id==verbs[randomnumber].id) {
                  setVerbs(verbs.filter(item => item.id!==verbs[randomnumber].id))
                  setRandomNumber(0)
                  setVerbVisibility(false)
                 }
            }}}/></div>
            <div id="buttonbg2"><VisibilityIcon fontSize='large' onClick={() => setVerbVisibility(!verbvisibility)}/></div>
            <div id="buttonbg2"><ArrowForwardIcon fontSize='large' bgcolor='black' onClick={() => {setRandomNumber((Math.floor(Math.random() * verbs.length))); setVerbVisibility(false);}}/></div>
          </div>
          : <div id="modalbuttons"><div id="buttonbg2"><CloseIcon onClick={() => handleClose()}/> </div></div>}

        </Box>
        
      </Modal>
      <ParticlesBg type="lines" bg={true} />

    </div>
  );
}

export default App;
