import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '../AppBar/bar';
import { AppBarButtons } from './appbar.buttons';
import CreateCommunityPopup from './create.community.popup'

const Communities = () => {
  
    const [appBarStatus, setAppBarStatus] = useState(null)
    const history = useHistory();
    
    function onStatusChange(e) {
      e.preventDefault()
      const val = e.target.id
      setAppBarStatus(val)
    }

    const hideForm = () => {
      setAppBarStatus(null)
    }

    return (<>
      <AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} />
      {
        appBarStatus === "create-new-community" ? <CreateCommunityPopup onCancel={hideForm}/> : null
      }
      <div style={{padding: "25px", font: "Arial"}}> Coming in part 3 &#10024;</div>
    </>
    );
}

export default Communities;
