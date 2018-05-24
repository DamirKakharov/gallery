import React from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';

import Search from './components/search/search';
import { setSearchAction, loadHomePage, loadSearchPage } from './actions/search.action';
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
    static propTypes = {
        data: PropTypes.array.isRequired,
        loadHomePage: PropTypes.func.isRequired,
        loadSearchPage: PropTypes.func.isRequired,
        setSearchFunction: PropTypes.func.isRequired,
        search: PropTypes.string.isRequired,
    };
    constructor() {
        super();
        this.state = {
            isOpen: false,
            litghboxImageSet: [
                { src: '' },
            ],
        };
    }

    componentDidMount() {
        this.props.loadHomePage();
    }

    respSearch = () => {
        if (this.props.search !== '') {
            this.props.loadSearchPage(this.props.search);
        } else {
            this.props.loadHomePage();
        }
    }

    openLightbox = (event) => {
        const srcData = event.target.getAttribute('data');
        this.setState({
            litghboxImageSet: [{ src: srcData }],
            isOpen: true,
        });
    }

    closeLightbox = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const childElements = this.props.data.map(dynamicData =>
            (<li className="grid__item" key={dynamicData.id} onClick={this.openLightbox} role="menuitem" >
                <img className="grid__img" src={dynamicData.urls.small} alt="" data={dynamicData.urls.full} />
            </li>),
        );

        return (
            <div>
                <Search setSearch={this.props.setSearchFunction} respSearch={this.respSearch} />
                <Masonry
                    className="grid"
                    elementType="ul"
                    options={masonryOptions}
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
        data: state.homePageResponse.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSearchFunction: (search) => {
            dispatch(setSearchAction(search));
        },
        loadHomePage: () => {
            dispatch(loadHomePage());
        },
        loadSearchPage: (searchResp) => {
            dispatch(loadSearchPage(searchResp));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
