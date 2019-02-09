import React, { Fragment, Component } from 'react';
import {Container} from "semantic-ui-react";
import './App.css';
import Plot from 'react-plotly.js';
import states from "./states";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const getNames = (key) => states.map(state => state[key])
const getRand = (n) => {
    let arr = []
    for(let i = 0; i < n; i++) {
        let number = Math.floor(Math.random()*10);
        arr.push(number)
    }
    return arr
}
const data = [
    {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: getNames("abbreviation"),
        text: getNames("name"),
        z: getRand(59),
        autocolorscale: true
    }
];

const layout = {
    title: 'USA MAP',
    autosize: true,
    geo: {
        scope: 'usa',
        showlakes: true,
        subunitcolor: '#060104'
    }
};
class App extends Component {
  render() {
    return (
        <Fragment>
            <NavBar />
            <Container fluid align="center">
                <Plot
                    data={data}
                    layout={layout}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                />
            </Container>
            <Footer />
        </Fragment>
    );
  }
}

export default App;