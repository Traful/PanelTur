import React, { Component } from "react";

class Msg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.setState({visible: this.props.visible});
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if(this.props.visible !== prevProps.visible) {
            this.setState({visible: this.props.visible});
        }
    }

    render() {
        return (
            <div className="modal fade show" style={{display: this.state.visible ? "block" : "none"}} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">SisTur</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.okClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.children}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.okClose}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Msg;