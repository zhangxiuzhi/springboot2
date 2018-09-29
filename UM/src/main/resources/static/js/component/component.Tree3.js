"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2018/1/25.
 */

var ComponentTree3 = function (_React$Component) {
	_inherits(ComponentTree3, _React$Component);

	function ComponentTree3(props) {
		_classCallCheck(this, ComponentTree3);

		var _this = _possibleConstructorReturn(this, (ComponentTree3.__proto__ || Object.getPrototypeOf(ComponentTree3)).call(this, props));

		_this.state = {
			data: []
		};

		_this.onToggle = _this.onToggle.bind(_this);
		_this.onClick = _this.onClick.bind(_this);
		_this.formatNodeData = _this.formatNodeData.bind(_this);
		return _this;
	}

	_createClass(ComponentTree3, [{
		key: "onToggle",
		value: function onToggle(event, node) {
			if (this.props.onToggle) {
				this.props.onToggle(event, node.props.node);
			}
		}
	}, {
		key: "onClick",
		value: function onClick(event, node) {
			if (this.props.onClick) {
				this.props.onClick(event, node.props.node);
			}
		}
	}, {
		key: "formatNodeData",
		value: function formatNodeData(array, data) {
			for (var i = 0; i < data.length; i++) {
				var nd = data[i];
				var param = {};
				console.log(nd);
				for (var d in nd) {
					if (d == "areaId") {
						param["name"] = nd[d];
					} else if (d == "areaName") {
						param["text"] = nd[d];
					} else {
						param[d] = nd[d];
					}
				}
				if (nd.children && nd.children.length > 0) {
					this.formatNodeData(param.children, nd.children);
				}
				array.push(param);
			}
			return array;
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.state.data.length == 0 ? this.props.data : this.state.data;

			console.log(data);
			var treeData = [];
			//console.log(this.formatNodeData(treeData,data))


			return React.createElement(Tree2, {
				data: treeData,
				className: this.props.className,
				onToggle: this.onToggle,
				onClick: this.onClick
			});
		}
	}]);

	return ComponentTree3;
}(React.Component);