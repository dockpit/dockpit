import React from 'react';
import Immutable from 'immutable'

class OpenDirBtn extends React.Component {
  constructor(props) { super(props) }
  
  openDir() {
  	console.log(window.dpShowOpenDirDialog())
  }

  render() {
    return <button onClick={this.openDir}>Open</button>
  }
}
 
OpenDirBtn.propTypes = {}

export default OpenDirBtn;