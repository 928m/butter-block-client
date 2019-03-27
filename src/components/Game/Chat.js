import React, { Component } from 'react';
import { ChatWrap, ChatInput } from '../StyledComponents';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.onChangeValue = this.onChangeValue.bind(this);
    this.input = React.createRef();
  }

  onChangeValue(ev) {
    const value = ev.target.value;
    const { onSubmitMessage, id } = this.props;

    if (ev.key === 'Enter' && value) {
      onSubmitMessage(id, value);
      this.input.current.value = '';
    }
  }

  render() {
    return (
      <ChatWrap>
        <ChatInput
          type="value"
          onKeyPress={this.onChangeValue}
          ref={this.input}
          placeholder="Press enter to enter."
        />
      </ChatWrap>
    );
  }
}

export default Chat;