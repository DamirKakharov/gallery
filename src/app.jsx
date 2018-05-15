import React from "react";
import "./app.scss";
import Masonry from "react-masonry-infinite";
import Search from "./components/search/search.jsx";

class App extends React.Component {
   constructor() {
      super();
      this.state = {
         hasMore: true,
         data: [],
         search: '',
         key: 'bcda5d758ceb319f79bd6eeff203a979b75cd35015bf422f5a0877b4ab03fa7a',
         sizes: [
            { columns: 1, gutter: 10 },
            { mq: '520px', columns: 1, gutter: 20 },
            { mq: '768px', columns: 2, gutter: 20 },
            { mq: '1024px', columns: 3, gutter: 20 }
         ],
      };

      this.updateData = this.updateData.bind(this);
   }

   updateData(value) {
      this.setState({ search: value });
      // if (value !== '') {
      //    fetch('https://api.unsplash.com/search/photos?client_id='
      //       + this.state.key + '&page=1&query='
      //       + value
      //       + '&per_page=6')
      //       .then((Response) => Response.json())
      //       .then((findResponse) => {
      //          console.log(findResponse.results);
      //          this.setState({
      //             data: findResponse.results,
      //          })
      //       })
      // } else {
      //    this.resp();
      // }
   }

   componentWillMount() {
      console.log("will" + this.state.search)
   }

   resp() {

      fetch('https://api.unsplash.com/photos?client_id=bcda5d758ceb319f79bd6eeff203a979b75cd35015bf422f5a0877b4ab03fa7a&page=2&per_page=15')
         .then((Response) => Response.json())
         .then((findResponse) => {
            console.log(findResponse);
            this.setState({
               data: findResponse,
            })
         })
      console.log("resp")
   }

   componentDidMount() {
      this.resp();

   }

   render() {
      return (
         // <div class="grid" ref="grid">
         //    {/* <Sss updateData={this.updateData} /> */}
         //    <div class="grid-sizer"></div>
         //    {this.state.data.map((dynamicData, key) =>
         //       <div class="grid-item img">
         //          <img src={dynamicData.urls.small} />
         //       </div>
         //    )}
         // </div>

         <div className="container" >
            <Search updateData={this.updateData} />
            <Masonry
               sizes={this.state.sizes}
               className="masonry"
               hasMore={this.state.hasMore}
               pack={true} 
            >
               {this.state.data.map((dynamicData, key) =>
                  <div class="grid-item img" key={key}>
                     <img src={dynamicData.urls.small} />
                  </div>
               )}
            </Masonry>
         </div>
      )
   }
}


export default App;
