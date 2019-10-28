import React from 'react';

class Button extends React.Component{
    render(){
        return(
            <button className={this.props.class}>
                Delete
            </button>
        );
    }
    
}

export default Button;