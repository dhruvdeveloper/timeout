import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends Component {

  state = {
    time: 8.00,
    leave: 0,
    inTime: 0,
    outTime: 0,
    in: false,
    out: true,
    totalTime: [],
    finalTime: {}
  };

  inBoom = () => {
    const t = new Date();
    const h = t.getHours();
    const m = t.getMinutes();

    this.setState({
      in: true,
      out: false,
      inTime: h + (m/60)
    });

    this.totalBoom();
  }

  outBoom = () => {
    const t = new Date();
    const h = t.getHours();
    const m = t.getMinutes();

    const timeTemp = h + (m/60);

    const totalTime = this.state.totalTime;

    totalTime.push(timeTemp - this.state.inTime);

    this.setState({
      in: false,
      out: true,
      outTime: timeTemp,
      totalTime: totalTime
    });
  }

  totalBoom = () => {
    const sum = this.state.totalTime.reduce((a, b) => a + b, 0);

    let time = this.state.time - this.state.leave;
    let tempHour = Math.floor(time);
    let tempMinute = Math.floor((time - tempHour) * 60);
    const finalTime = {
      hour: tempHour,
      minute: tempMinute
    }

    this.setState({
      leave: sum,
      finalTime: finalTime
    });
  }

  render() {

    console.log(this.state.finalTime);
    return (
      <div className="App">
        <h3>Hello Fucking World!</h3>
        <Button onClick = {this.inBoom} disabled = {this.state.in}>In</Button>
        <Button onClick = {this.outBoom} disabled = {this.state.out}>Out</Button>
        <div>
          <p onClick = {this.totalBoom}>
            {this.state.finalTime.hour} : {this.state.finalTime.minute}
          </p>
        </div>

      </div>
    );
  }
}

export default App;
