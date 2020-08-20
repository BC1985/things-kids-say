import React, { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
        const refresh = ()=> {
            window.location.reload()
        }
      if (this.state.hasError) {
        return (
            <div className="container childish-font mt-5">
                <h1>Oops...</h1>
                <h2>Something went wrong. Sorry about that...</h2>
                <button onClick={refresh} className="btn btn-primary">Click here to try again</button>
            </div>
        )
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;