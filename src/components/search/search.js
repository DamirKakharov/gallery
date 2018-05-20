import React from 'react';
import PropTypes from 'prop-types';


class Search extends React.Component {
    static propTypes = {
        updateData: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    // onKeyPressed(e) {
    //     if (e.keyCode === 13) {
    //         this.props.updateData(this.state.name);
    //         console.log('df');
    //     }
    // }

    onKeyPressed(e) {
        if (e.keyCode === 13) {
            return this.props.setSearch(this.state.name);
            console.log(this.state.name);
        }
        return e;
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <div>
                {/* <input tabIndex="0" type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.onKeyPressed} /> */}
                <input tabIndex="0" type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.onKeyPressed} />
                <button onClick={() => { this.props.updateData(this.state.name); }}>Search</button>
            </div>
        );
    }
}

export default Search;
