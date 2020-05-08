import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Upload from "./uploads"
import "./App.css";
import * as Ramda from "ramda";

const useSSE = eventsource => {
  const [nests, setNests] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(eventsource);
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setNests((nests) => nests.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, nests, eventsource]);

  return nests;
}

const PropTest = (props) => {
  console.log(props)
  const { it } = props
  console.log(it)
  const { tiz } = props
  console.log(tiz)
  return (<div> hello </div>)
}

const Home = () => {
  // const [nests, setNests] = useState([]);
  // const [listening, setListening] = useState(false);

  // useEffect(() => {
  //   if (!listening) {
  //     const events = new EventSource("http://localhost:3000/events");
  //     events.onmessage = (event) => {
  //       const parsedData = JSON.parse(event.data);

  //       setNests((nests) => nests.concat(parsedData));
  //     };

  //     setListening(true);
  //   }
  // }, [listening, nests]);

  const [dat, setDat] = useState([]);

  const nests = useSSE("http://localhost:3000/events");

  useEffect(() => {
    if (nests.length) {
      debugger
      const _newDat = Ramda.union(dat, nests)
      setDat(_newDat)
    }
  }, [nests])

  if (dat.length) {
    return (
      <table className="stats-table">
        <thead>
          <tr>
            <th>Momma</th>
            <th>Eggs</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {nests.map((nest, i) => (
            <tr key={i}>
              <td>{nest.momma}</td>
              <td>{nest.eggs}</td>
              <td>{nest.temperature} ℃</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {

    const spreadOps = {
      me: "hi",
      you: "hello"
    }
    const spreadOps2 = ["hi", "you"]
    return (
      <>
        <PropTest tiz={spreadOps2} it={spreadOps} />
      </>
    );
  }
}
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
    </Switch>
  </Router>

)

export default App;
