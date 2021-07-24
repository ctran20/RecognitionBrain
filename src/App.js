import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '5983a38a3ba2478889fa3cdad072fbfa'
});

const particlesSetting = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.topRow * height,
      rightCol: width - clarifaiFace.right_col,
      bottomRow: height - clarifaiFace.bottomRow,
    }
  }

  displayBox = (box) => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
      .then(response => {
        this.displayBox(this.calculateFaceLocation(response));
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch(err => { console.log(err) });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App" >
        <Particles className='particles' params={particlesSetting} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Logo />
        {route === 'home' ?
          <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} />
            : < Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
