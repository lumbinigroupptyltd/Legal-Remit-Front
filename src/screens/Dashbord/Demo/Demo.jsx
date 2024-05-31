import Tesseract from 'tesseract.js';
import license from '../Demo/license.png'
import React from 'react';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageText: "",
      userInput: "",
      isVerified: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Tesseract.recognize(
      license,
      'eng',
      { logger: m =>  console.log(m) }
    ).then(({ data: { text } }) => {
      this.setState({ imageText: text });
      if (this.state.userInput === this.state.imageText) {
        this.setState({ isVerified: true });
      }
    });
  }

  render() {
    return (
      <div  onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
      <form onSubmit={this.handleSubmit} >
        <label>
          User Input:
          <input type="text" value={this.state.userInput} onChange={this.handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <p>Image Text: {this.state.imageText}</p>
        {this.state.isVerified && <p>Verification Successful!</p>}
      </form>
      </div>
    );
  }
}
