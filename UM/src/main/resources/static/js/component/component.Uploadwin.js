'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/3/30.
 *
 * 带批量上传文件的的弹出窗
 *
 * 回调方法：点击确定后，执行回调方法
 */

var ComponentUploadWin = function (_React$Component) {
    _inherits(ComponentUploadWin, _React$Component);

    function ComponentUploadWin(props) {
        _classCallCheck(this, ComponentUploadWin);

        var _this = _possibleConstructorReturn(this, (ComponentUploadWin.__proto__ || Object.getPrototypeOf(ComponentUploadWin)).call(this, props));

        var _self = _this;

        _this.response = [];
        _this.state = {
            content: "" //展示的内容 html
        };
        _this.requestUrl = _this.requestUrl.bind(_this);
        _this.requestUrlData = _this.requestUrlData.bind(_this);
        _this.callback_confirm = _this.callback_confirm.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.callback_cancel = _this.callback_cancel.bind(_this);
        return _this;
    }

    //已插入真实 DOM 之后


    _createClass(ComponentUploadWin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var component = this;
            var $mfupload = $(this.refs.mfupload);
            var _url = this.props.url;
            $mfupload.plupload({
                // 设置
                runtimes: 'html5,html4',
                url: _url,

                // 一次最多添加20个文件
                max_file_count: 20,

                chunk_size: '1mb',

                // Resize images on clientside if we can
                resize: {
                    width: 200,
                    height: 200,
                    quality: 90,
                    crop: true // crop to exact dimensions
                },

                filters: {
                    // 文件大小限制
                    max_file_size: '1000mb',
                    // 指定文件类型
                    mime_types: [
                    //{title : "Image files", extensions : "jpg,gif,png"},
                    // {title : "Zip files", extensions : "zip,rar,7z"},
                    { title: "File files", extensions: "doc,docx,xls,xlsx,pdf" }]
                },

                //不允许重命名
                rename: false,

                // 排序
                sortable: false,

                // 允许拖动
                dragdrop: false,

                // 显示模式
                views: {
                    list: true,
                    thumbs: false, // Show thumbs
                    active: 'list'
                },

                // 事件
                preinit: {

                    init: function init(up) {
                        $(".plupload_container").css("height", $(component.refs.modal.refs.modalBody).innerHeight() - 20);
                    },
                    //文件上传
                    UploadFile: function UploadFile(up, file) {
                        //console.log('[UploadFile]', file);

                        // 可通过设置选项改变
                        // up.setOption('url', 'upload.php?id=' + file.id);
                        // up.setOption('multipart_params', {param1 : 'value1', param2 : 'value2'});
                    }
                },

                // 事件
                init: {

                    Browse: function Browse(up) {
                        // 预览文件
                        //console.log('[Browse]');
                    },

                    Refresh: function Refresh(up) {
                        //刷新
                        //console.log('[Refresh]');
                    },

                    StateChanged: function StateChanged(up) {
                        // 状态变化
                        //console.log('[StateChanged]', up.state == plupload.STARTED ? "STARTED" : "STOPPED");
                    },

                    QueueChanged: function QueueChanged(up) {
                        // 添加文件或删除文件
                        //console.log('[QueueChanged]');
                    },

                    OptionChanged: function OptionChanged(up, name, value, oldValue) {
                        // 配置选项变化
                        //console.log('[OptionChanged]', 'Option Name: ', name, 'Value: ', value, 'Old Value: ', oldValue);
                    },

                    BeforeUpload: function BeforeUpload(up, file) {
                        // 开始上传前，并可以使用取消上传
                        //console.log('[BeforeUpload]', 'File: ', file);
                    },

                    UploadProgress: function UploadProgress(up, file) {
                        // 上传进度
                        //console.log('[UploadProgress]', 'File:', file, "Total:", up.total);
                    },

                    FileFiltered: function FileFiltered(up, file) {
                        // 文件过滤器
                        //console.log('[FileFiltered]', 'File:', file);
                    },

                    FilesAdded: function FilesAdded(up, files) {
                        //文件添加
                        //console.log('[FilesAdded]');
                        /*
                                            plupload.each(files, function(file) {
                                                console.log('  File:', file);
                                            });*/
                    },

                    FilesRemoved: function FilesRemoved(up, files) {
                        // 文件删除后
                        //console.log('[FilesRemoved]');

                        /*plupload.each(files, function(file) {
                            console.log('  File:', file);
                        });*/
                    },

                    FileUploaded: function FileUploaded(up, file, info) {
                        // 已上传文件
                        //console.log('[FileUploaded] File:', file, "Info:", info,JSON.parse(info.response));

                        component.response.push(JSON.parse(info.response)[0]);
                        /*if(component.props.callback){
                            //回调文件集合
                            component.props.callback({
                                name:files.name,
                                id:info.response
                            });
                        }*/
                    },

                    ChunkUploaded: function ChunkUploaded(up, file, info) {
                        //
                        //console.log('[ChunkUploaded] File:', file, "Info:", info);
                    },

                    UploadComplete: function UploadComplete(up, files) {
                        // 上传完成
                        // console.log('[UploadComplete]',up,files,component.response);
                        var array = [];
                        for (var i = 0; i < files.length; i++) {
                            array.push({
                                name: files[i].name,
                                id: component.response[i]
                            });
                        }
                        console.log(array);
                        if (component.props.callback) {
                            //回调文件集合
                            component.props.callback(array);
                        }
                    },

                    Destroy: function Destroy(up) {
                        //
                        //console.log('[Destroy] ');
                    },

                    Error: function Error(up, args) {
                        //报错
                        //console.log('[Error] ', args);
                    }
                }
            });
        }
        //更新后

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            //add block

        }
    }, {
        key: 'callback_confirm',
        value: function callback_confirm() {}
    }, {
        key: 'callback_cancel',
        value: function callback_cancel() {
            if (this.props.onClose) {
                this.props.onClose();
            }
        }

        //加载url数据

    }, {
        key: 'requestUrlData',
        value: function requestUrlData() {
            jbsframe.ajaxRequest({
                url: this.props.url
            }, function (data, msg) {
                //填充
                this.setState({
                    content: this.renderList(data.content)
                });
            }.bind(this));
        }
    }, {
        key: 'requestUrl',
        value: function requestUrl() {
            var component = this;

            var $modal = $(this.refs.modal.refs.root);

            var fullscrean = this.props.style;

            //console.console.log(this.refs.ifrm)
        }

        //关闭

    }, {
        key: 'close',
        value: function close() {
            this.refs.modal.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var mfupload = React.createElement("div", {
                ref: "mfupload",
                className: "modal-multiFileUpload",
                id: "component-multiFileUpload",
                style: { border: 0 }
            });

            return React.createElement(SelectWindow, {
                ref: 'modal',
                className: "swin-modal",
                style: this.props.style,
                title: this.props.title,
                message: mfupload,
                multipleBtn: this.props.multipleBtn ? true : false,
                confirm: null,
                cancel: null,
                //confirm1:"全屏",
                onConfirm: this.callback_confirm,
                onCancel: this.callback_cancel
            });
        }
    }]);

    return ComponentUploadWin;
}(React.Component);