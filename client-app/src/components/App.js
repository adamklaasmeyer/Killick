import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./Home";

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
  render() {
    return <Home />;
  }
}

// render() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1 className="App-title">Welcome to React</h1>
//       </header>
//       <p className="App-intro">
//         To get started, edit <code>src/App.js</code> and save to reload.
//       </p>
//     </div>
//   );
// }

export default connect(mapStateToProps)(App);
