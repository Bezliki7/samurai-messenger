import React from "react";

class DescriptionStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activeEditMide = () => {
        this.setState(
            { editMode: true }
        )
    }
    deactivateEditMode = () => {
        this.setState(
            { editMode: false }
        )
        this.props.updateStatus(this.state.status)
    }
    changeStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        debugger
        return (
            <>
                {(this.state.editMode)
                    ? <div> <input onChange={this.changeStatus} autoFocus={true}
                        onBlur={this.deactivateEditMode} value={this.state.status} /> </div>
                    : <div onDoubleClick={this.activeEditMide} > {this.props.status || 'no status'} </div>}

            </>
        )
    }
}

export default DescriptionStatus