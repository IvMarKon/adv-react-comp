import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = withToggle(({children,on})=>{
  return !on ? children : null;
});
// ToggleOn.contextTypes = {
//   [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
// };

const ToggleOff = withToggle(({children,on})=>{
  return on ? children : null;
});
// ToggleOff.contextTypes = {
//   [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
// };

const ToggleButton = withToggle(({on,toggle,...props})=>{
  return (      
  <div id="toggles">
    <input checked={on} onChange={toggle} {...props} type="checkbox" name="checkbox1" id="checkbox3" className="ios-toggle" />
    <label htmlFor="checkbox3" className="checkbox-label" data-off="On" data-on="Off"></label>
  </div>
  )
});
// ToggleButton.contextTypes = {
//   [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
// };

class Toggle extends Component{
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = {onToggle: ()=>{}}
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }
  state = {
    on: false
  };
  toggle=()=>this.setState(
    ({on}) => ({on: !on}),
    ()=>{
      this.props.onToggle(this.state.on);
    },
  );
  getChildContext(){
    return{
      [TOGGLE_CONTEXT]:{
        on: this.state.on,
        toggle: this.toggle
      }
    }
  };
  render(){
    return <div>{this.props.children}</div>
  }
}

function withToggle(Component){
  function Wrapper(props,context){
    const toggleContext = context[TOGGLE_CONTEXT];
    return (      
    <Component {...toggleContext}{...props}/>
    )
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  };
  return Wrapper;
}

const MyToggle = withToggle(({on,toggle})=>(
  <button onClick={toggle}>
    {on?'on':'off'}
  </button>
));

class App extends Component {
  render() {
    return (
      <div className="App">
       <Toggle onToggle={on=>console.log('toggle',on)}>
       <div>
       <Toggle.On>Button on</Toggle.On>
       <Toggle.Button/>
       </div>
       <Toggle.Off>Button off</Toggle.Off>
       <MyToggle/>
       </Toggle>
      </div>
    );
  }
}

export default App;
