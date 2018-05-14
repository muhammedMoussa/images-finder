import React, { Component } from 'react';
import Results from '../results/Results';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Search extends Component {
  state = {
    searchText: '',
    number: 10,
    images: []
  }

  onTextChange = (e) => {
    const val = e.target.value
    const apiUrl = 'https://pixabay.com/api'
    const apiKey = '8995494-f9bd4397aca6eda54763e8add'

    this.setState({ searchText: val }, () => {
      if( val===" " ) {
        this.setState({ images: [] })
      } else {
        axios.get(`${apiUrl}/?key=${apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.number}&safesearch=true`)
        .then(res => {
          // console.log(res.data.hits)
          this.setState({ images: res.data.hits })
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  }
  onNumberChange = (e, index, value) => this.setState({ number: value });

  render() {
    return (
      <div>
      <SelectField
            name="number"
            value={this.state.number}
            floatingLabelText="Number of images"
            style={{ padding: '10px' }}
            onChange={this.onNumberChange}
          >
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
            <MenuItem value={15} primaryText="15" />
            <MenuItem value={30} primaryText="30" />
            <MenuItem value={50} primaryText="50" />
          </SelectField>
          <br />
        <TextField
          floatingLabelText="Search For Image!"
          style={{ padding: '20px' }}
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          fullWidth={true}
        />
        <br />
        {this.state.images.length > 0 &&
           <Results images={this.state.images} />
        }
      </div>
    );
  }
}

export default Search;