import React from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Lightbox from 'react-images';

import Search from './components/search/search';
import * as APIConts from './constants/api';
import setSearchAction from './actions/search.action';
import './app.scss';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            page: 1,
            data: [],
            litghboxImageSet: [
                { src: '' },
            ],
        };
    }

    componentDidMount() {
        this.respDef();
    }

    respDef() {
        fetch(`${APIConts.PATH}${APIConts.KEY}${APIConts.PAGE}${this.state.page}${APIConts.PER_PAGE}20`)
            .then(Response => Response.json())
            .then((findResponse) => {
                this.setState({
                    data: findResponse,
                    // data: [...this.state.data, ...findResponse],
                });
            });
    }

    respSearch = () => {
        if (this.props.search !== '') {
            fetch(`${APIConts.PATH_SEARCH}${APIConts.KEY}${APIConts.PAGE}${this.state.page}${APIConts.QUERY}${this.props.search}${APIConts.PER_PAGE}20`)
                .then(Response => Response.json())
                .then((findResponse) => {
                    this.setState({
                        data: findResponse.results,
                    });
                });
        } else {
            this.respDef();
        }
    }

    openLightbox = (event) => {
        const srcData = event.target.getAttribute('data');
        this.setState({ litghboxImageSet: [{ src: srcData }] });
        this.setState({ isOpen: true });
    }

    closeLightbox = () => {
        this.setState({ isOpen: false });
    }


    render() {
        const childElements = this.state.data.map(dynamicData =>
            (<li className="grid__item" key={dynamicData.id} onClick={this.openLightbox} role="menuitem" >
                <img className="grid__img" src={dynamicData.urls.small} alt="" data={dynamicData.urls.full} />
            </li>),
        );


        return (
            <div>
                <Search setSearch={this.props.setSearchFunction} respSearch={this.respSearch} />
                <Masonry
                    className={'grid'}
                    elementType={'ul'}
                    options={APIConts.masonryOptions}
                >
                    {childElements}
                </Masonry>
                <Lightbox
                    images={this.state.litghboxImageSet}
                    isOpen={this.state.isOpen}
                    onClose={this.closeLightbox}
                    showImageCount={false}
                />
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
