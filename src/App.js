import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";

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
    title: "World Happiness Data",
    geo: {
        showlakes: true,
        subunitcolor: '#ffffff'
    }
};
class App extends Component {

    createUser = (e, userObj) => {
        const { name, email, password } = userObj
        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ name, email, password, country_code: this.state.countryCode })
        })
            .then(resp => resp.json())
            .then(this.setUserData)
    };

    setUserData = (data) => {
        if(data.message) {
            this.setState({message: data.message})
        } else {
            this.setState({user: data.user, message: ''});
            localStorage.setItem('jwt', data.jwt);
        }
    }

    loginUser = userObj => {
        const { email, password } = userObj
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ user: { email, password } })
        })
            .then(resp => resp.json())
            .then(this.setUserData)
    };

    logout = () => {
        localStorage.removeItem('jwt')
        this.setState({user: {}})
    }

    state = {
        user: {},
        countryCode: {},
        message: '',
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
        this.getFeelings();
        let token = localStorage.getItem("jwt");
        if (token) {
            fetch("http://localhost:3000/api/v1/profile", {
                headers: {
                    "content-type": "application/json",
                    'Accepts': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data =>
                    data.message ? alert(`Must Log In`) : this.setState({ user: data.user })
                );
        }

        fetch('https://geoip-db.com/json/')
            .then(res => res.json())
            .then(data => this.setState({countryCode: data.country_code}))

    
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


    // plotClick = (e) => {
    //   console.log("click plot", e.points[0].pointIndex);
    // }


    render() {
        const { mapData, user, countryCode, message } = this.state;
        const userExists = Object.keys(user).length > 0
    return (
        <Fragment>
            <NavBar
                user={user}
                countryCode={countryCode}
                message={message}
                loginUser={this.loginUser}
                logout={this.logout}
                createUser={this.createUser}
                setUserData={this.setUserData}/>
            <Switch>
                <Route exact path='/' render={() => {
                    return <Home userExists={userExists} mapData={mapData} layout={layout}/>
                }}/>
                <Route exact path='/profile' render={() => (
                    userExists ? <Profile user={user}/> : <Redirect to="/"/>
                )
                }/>
            </Switch>
            <Footer />
        </Fragment>
    );
  }
}

export default App;
