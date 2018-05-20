import React from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';

import Search from './components/search/search';
import * as APIConts from './constants/api';
import setSearchAction from './actions/search.action';
import './app.scss';

const masonryOptions = {
    transitionDuration: '0.5s',
    // columnWidth: 300,
    resize: true,
    gutter: 20,
    percentPosition: true,
    fitWidth: true,
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hasMore: true,
            data: [],
            // search: '',
        };

        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
        this.resp();
    }

    updateData(value) {
        this.setState({ search: value });
        if (value !== '') {
            fetch('https://api.unsplash.com/search/photos?client_id='
                + APIConts.KEY + '&page=1&query='
                + value
                + '&per_page=20')
                .then(Response => Response.json())
                .then((findResponse) => {
                    console.log(findResponse.results);
                    this.setState({
                        data: findResponse.results,
                    });
                });
        } else {
            this.resp();
        }
    }

    resp() {
        fetch('https://api.unsplash.com/photos?client_id=bcda5d758ceb319f79bd6eeff203a979b75cd35015bf422f5a0877b4ab03fa7a&page=2&per_page=15')
            .then(Response => Response.json())
            .then((findResponse) => {
                console.log(findResponse);
                this.setState({
                    data: findResponse,
                });
            });
    }


    render() {
        const childElements = this.state.data.map(dynamicData =>
            (<li className="grid__item" key={dynamicData.id} >
                <img src={dynamicData.urls.small} alt="" />
            </li>),
        );

        return (
            <div className="masonry" >
                <Search updateData={this.updateData} setSearch={this.props.setSearchFunction} />
                <Masonry
                    className={'grid'}
                    elementType={'ul'}
                    options={masonryOptions}
                    updateOnEachImageLoad={false}
                >
                    {childElements}
                </Masonry>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.searchResponse.search,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSearchFunction: (search) => {
            dispatch(setSearchAction(search));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
