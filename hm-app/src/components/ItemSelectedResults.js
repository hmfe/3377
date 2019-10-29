import  React from 'react';

class ItemSelectedResults extends React.Component{
    render() {
        return(
            <li>
                <p>
                    <span className='selected-option'>{this.props.item.value}</span>
                    <i className='close' onClick={() => this.props.handleRemoveItem(this.props.item.id)}></i>
                    <span className='selected-option-date'>{this.props.item.date}</span>
                </p>
            </li>
        )
    }
}

export default ItemSelectedResults;