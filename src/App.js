import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
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

  render() {
    return (
      <div className="App" >
        <Particles className='particles' params={particlesSetting} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
