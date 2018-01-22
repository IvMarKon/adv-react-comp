import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function ToggleOn({on,children}){
  return !on ? children : null;
}

function ToggleOff({on,children}){
  return on ? children : null;
}

function ToggleButton({on, toggle, ...props}){
  return (      
  <div id="toggles">
    <input checked={on} onChange={toggle} {...props} type="checkbox" name="checkbox1" id="checkbox3" className="ios-toggle" />
    <label htmlFor="checkbox3" className="checkbox-label" data-off="On" data-on="Off"></label>
  </div>
  )
}

class Toggle extends Component{
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: ()=>{}}
  state = {
    on: false
  };
  toggle=()=>this.setState(
    ({on}) => ({on: !on}),
    ()=>{
      this.props.onToggle(this.state.on);
    },
  )
  render(){
    const children = React.Children.map(
      this.props.children,
      child => React.cloneElement(child,{
        on: this.state.on,
        toggle: this.toggle
      })
    );
    return <div>{children}</div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
       <Toggle onToggle={on=>console.log('toggle',on)}>
       <Toggle.On>Button on</Toggle.On>
       <Toggle.Button/>
       <Toggle.Off>Button off</Toggle.Off>
       </Toggle>
      </div>
    );
  }
}

export default App;
