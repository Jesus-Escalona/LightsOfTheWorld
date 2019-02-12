import React, { Fragment, Component} from 'react';
import {Container, Rating, Form, Button, Dropdown, Input } from "semantic-ui-react";
import './App.css';
import Plot from 'react-plotly.js';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const getNames = (array, key1, key2) => array.map(obj => obj[key1][key2])

// const getRand = (n) => {
//     let arr = []
//     for(let i = 0; i < n; i++) {
//         let number = Math.floor(Math.random()*10);
//         arr.push(number)
//     }
//     return arr
// }


const layout = {
    //autosize: true,
    title: "Jesus will choose this map's title",
    geo: {
        showlakes: true,
        subunitcolor: '#ffffff'
    }
};
class App extends Component {
    state = {
        width: '',
        mapData: {

          type: 'choropleth',
          locationmode: 'country names',
          locations: [],
          text: [],
          z: [],
          colorscale: [
             [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
             [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
             [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
         ],
         colorbar: {
           title: 'Happiness Level',
           thickness: '30'
         }
       },
        intensity: 0,
        emotion: ''
    }


    componentDidMount() {
        this.setState({width: window.innerWidth})
        window.addEventListener('resize', this.updateDimensions)
        this.getFeelings()

    
  }

    getFeelings = () => {
      fetch('http://localhost:3000/api/v1/countries')
      .then(res => res.json())
      .then(data => {
        let countries = getNames(data.countries.data, 'attributes', 'name')
        let happiness = getNames(data.countries.data, 'attributes', 'average')
        this.setState({mapData: {
          ...this.state.mapData,
          locations: countries,
          text: countries,
          z: happiness
        }})
      }
    )
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth})
    }


    // plotClick = (e) => {
    //   console.log("click plot", e.points[0].pointIndex);
    // }

    handleChange = (e, d) => {
      console.log(d.name);
      this.setState({
        [d.name]: d.value
       })
    }

    handleSubmit =  (e) => {
      e.preventDefault()
      const {intensity, emotion} = this.state
      fetch('http://localhost:3000/api/v1/user_emotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({intensity, emotion})
      })
        .then(res => res.json())
        .then(data => console.log("success"))
    }

    render() {
    return (
        <Fragment>
            <NavBar />
            <Container fluid align="center">
              <Form onSubmit={this.handleSubmit}>

                <Dropdown onChange={this.handleChange}
                  name="emotion"
                  button
                  className="icon"
                  floating
                  labeled
                  icon='flask' text='Select Emotion' search selection options={[{value: 1, text: 'Happiness'}]}/>
                <div>
                  <div>Rating: {this.state.intensity}</div>
                  <Input name="intensity" type='range' min={0} max={10} value={this.state.intensity} onChange={this.handleChange} />
                  <br />
                  <Rating rating={this.state.intensity} maxRating={10} />
                  </div>
                  <Button>Submit</Button>
              </Form>

              {this.state.mapData.locations.length &&
                <Plot onClick={this.plotClick}
                    data={[this.state.mapData]}
                    layout={layout}
                    //useResizeHandler
                    style={{
                        width: this.state.width > 1000 ? '1000px' : '100%',
                        height: this.state.width > 1000 ? '600px' : '100%'
                    }}
                    config={{
                        displaylogo: false
                    }}
                />}
            </Container>
            <Footer />
        </Fragment>
    );
  }
}

export default App;
