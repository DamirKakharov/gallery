import React from "react";


class Search extends React.Component {
   constructor() {
      super();
      this.state = {
         name: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.onKeyPressed = this.onKeyPressed.bind(this);
   }

   handleChange(event) {
      this.setState({ name: event.target.value });
   }

   onKeyPressed(e) {
      if (e.keyCode == 13) {
         this.props.updateData(this.state.name);
         console.log('df');
      }
   }
   render() {
      return (
         <div>
            <input tabIndex='0' type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.onKeyPressed} />
            <button onClick={() => { this.props.updateData(this.state.name) }}>Search</button>
         </div>
      )
   }
}

export default Search;