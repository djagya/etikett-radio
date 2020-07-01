import React from 'react'

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {    
  // Update state so the next render will show the fallback UI.    
  return { hasError: true, error };  
  }

  componentDidCatch(error, errorInfo) {    
  // You can also log the error to an error reporting service    
    console.log(error, errorInfo);  
  }
  
  render() {
    if (this.state.hasError) {      
    // You can render any custom fallback UI      
      return (
        <div className="global-error-outer-container">
          <div className="global-error-inner-container">
            <h1>Something went wrong: </h1>
            <p>{this.state.error.message}</p>
            {/* Shoud we just ask the user to realod the page? */}
            <button onClick={() => window.location = '/'}>Home</button>
          </div>
        </div>
      )    
    }
    return this.props.children; 
  }
}

export default GlobalErrorBoundary;