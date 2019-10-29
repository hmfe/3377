import React from 'react';
import './css/style.css';
import Button from './components/Button';
import SimpleSearch from './components/SimpleSearch';

class App extends React.Component {
  render(){
    return (
      <div>
        <h1>Simple Search Application</h1>
        <SimpleSearch/>
        <Button class="btn-delete" />
      </div>   
    );
  }
  
}

export default App;
