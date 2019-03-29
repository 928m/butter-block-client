import React, { Component } from 'react';
import { Colors, ColorItem } from '../StyledComponents';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.color
    };
  }

  onClickColor(ev) {
    const { onChangeColor } = this.props;
    const selectedColor = ev.currentTarget.dataset.color;

    this.setState({ selected: selectedColor });
    onChangeColor(selectedColor);
  }

  render() {
    const { colors } = this.props;

    return (
      <Colors>
        {
          colors.map((color) => {
            const hexColor = color.slice(2, color.length);
            return (
              <ColorItem
                data-color={color}
                color={`#${hexColor}`}
                key={color}
                onClick={this.onClickColor.bind(this)}
                className={`${(this.state.selected === color) && 'on'}`}
              >
                <em>{`#${hexColor}`}</em>
              </ColorItem>
            );
          })
        }
      </Colors>
    );
  }
}

export default ColorPicker;
