import PropTypes from "prop-types";
var React = require("react");

class FileInput extends React.Component {
  state = {
    value: "",
    styles: {
      parent: {
        position: "relative",
      },
      file: {
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        width: "100%",
        zIndex: 1,
      },
      text: {
        position: "relative",
        zIndex: -1,
      },
    },
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value.split(/(\\|\/)/g).pop(),
    });
    if (this.props.onChange) this.props.onChange(e);
  };

  render() {
    return (
      <div style={this.state.styles.parent}>
        {/* // Actual file input */}
        <input
          type="file"
          name={this.props.name}
          className={this.props.className}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          accept={this.props.accept}
          style={this.state.styles.file}
        />
        {/* // Emulated file input */}

        <input
          type="text"
          tabIndex={-1}
          name={this.props.name + "_filename"}
          value={this.state.value}
          className={this.props.className}
          onChange={function () {}}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          style={this.state.styles.text}
        />
      </div>
    );
  }
}
FileInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
};

export default FileInput;
//module.exports = FileInput;
