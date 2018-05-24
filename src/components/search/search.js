import React from 'react';
import PropTypes from 'prop-types';

import './search.scss';

class Search extends React.Component {
    static propTypes = {
        respSearch: PropTypes.func.isRequired,
        setSearch: PropTypes.func.isRequired,
    };

    onKeyPressed = (event) => {
        if (event.keyCode === 13) {
            this.props.respSearch();
        }
    }

    handleClick = () => {
        this.props.respSearch();
    }

    handleChange = (event) => {
        this.props.setSearch(event.target.value);
    }

    render() {
        return (
            <div className="search">
                <input className="search__input" tabIndex="0" type="text" onChange={this.handleChange} onKeyDown={this.onKeyPressed} />
                <button className="search__button" onClick={this.handleClick}>Search</button>
            </div>
        );
    }
}

export default Search;
