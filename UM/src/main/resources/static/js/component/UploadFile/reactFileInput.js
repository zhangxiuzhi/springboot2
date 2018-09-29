'use strict';

/**
 * Created by wzj on 2018/1/31.
 */

var FileInput = React.createClass({
	getInitialState: function getInitialState() {
		return {
			value: '',
			styles: {
				parent: {
					position: 'relative'
				},
				file: {
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: 0,
					width: '100%',
					zIndex: 1
				},
				text: {
					position: 'relative',
					zIndex: -1
				}
			}
		};
	},

	handleChange: function handleChange(e) {
		this.setState({
			value: e.target.value.split(/(\\|\/)/g).pop()
		});
		if (this.props.onChange) this.props.onChange(e);
	},

	render: function render() {
		return React.DOM.div({
			className: "reactFileInput"
			//style: this.state.styles.parent
		},

		// Actual file input
		React.DOM.input({
			type: 'file',
			id: this.props.id,
			name: this.props.name,
			className: this.props.className,
			onChange: this.handleChange,
			disabled: this.props.disabled,
			accept: this.props.accept,
			style: this.state.styles.file
		}),

		// Emulated file input
		React.DOM.input({
			type: 'text',
			tabIndex: -1,
			name: this.props.name + '_filename',
			value: this.state.value,
			className: this.props.className,
			onChange: function onChange() {},
			placeholder: this.props.placeholder,
			disabled: this.props.disabled,
			style: this.state.styles.text
		}));
	}
});