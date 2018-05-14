import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Visibility from 'material-ui/svg-icons/action/visibility';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Chat from 'material-ui/svg-icons/communication/chat';

class Results extends Component {
  state = {
    open: false,
    currentImg: ''
  }

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList style={{ padding: '10px' }} cols={3}>
          {images.map(img => (
            <GridTile
              style={{ margin: '10px' }}
              title={img.tags}
              key={img.id}
              subtitle={
                <div>
                  <span
                    style={{cursor: 'pointer'}}
                    onClick={ ()=> { window.open(`https://pixabay.com/users/${img.user}`) }}
                  >
                  by @{img.user}
                  </span> <br />
                  <span> <strong>{img.views}</strong> <Visibility color="white" /></span>
                  <span> <strong>{img.likes}</strong> <ThumbUp color="white" /></span>
                  <span> <strong>{img.comments}</strong> <Chat color="white" /></span>

                  {/*<span>{img.views} view</span> <br />
                  <span>{img.downloads} downloads</span> <br />
                  <span>{img.likes} likes</span> <br />
              <span>{img.comments} comments</span> <br />*/}
                </div>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }
    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];
    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    );
  }
}

Results.propTypes = {
  images: PropTypes.array.isRequired
};

export default Results;