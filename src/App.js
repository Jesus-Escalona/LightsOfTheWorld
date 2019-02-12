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
    //autosize: true,
    geo: {
        showlakes: true,
        subunitcolor: '#060104'
    }
};
class App extends Component {
    state = {
        width: ''
    }


    componentDidMount() {
        this.setState({width: window.innerWidth})
        window.addEventListener('resize', this.updateDimensions)
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth})
    }


    render() {
    return (
        <Fragment>
            <NavBar />
            <Container fluid align="center">
                <Plot
                    data={data}
                    layout={layout}
                    //useResizeHandler
                    style={{
                        width: this.state.width > 1000 ? '1000px' : '100%',
                        height: this.state.width > 1000 ? '600px' : '100%'
                    }}
                    config={{
                        displaylogo: false
                    }}
                />
            </Container>
            <Footer />
        </Fragment>
    );
  }
}

export default App;
