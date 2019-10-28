import React from 'react';
import ItemSelectedResults from "./ItemSelectedResults"; 
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <span>{suggestion.name}</span>
  );

class SimpleSearch extends React.Component{

    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            selectedSuggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        fetch(`https://swapi.co/api/people/?search=${value}`)
            .then(response => response.json())
            .then(data => this.setState({ suggestions: data.results }))
    };

    getParsedDate(date){
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const min =date.getMinutes();
        const sec= date.getSeconds();
        return (year + '/' + month + '/' + day + ' ' + hours + ':' + min + ':' + sec);
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
        const  date =this.getParsedDate(new Date(Date.now()));
        const selectedSuggestion ={
            id: date,
            value: suggestionValue,
            date: date
        };
        this.setState({
            selectedSuggestions:[...this.state.selectedSuggestions, selectedSuggestion]
        });
    };

    onSelectedSuggestionsClearList = () =>{
        this.setState({
            selectedSuggestions:[]
        });
    };

    handleRemoveItem = (idRemove) =>{
        this.setState({selectedSuggestions: this.state.selectedSuggestions.filter(function(selectedSuggestion) {
                return selectedSuggestion.id !== idRemove
            })});

    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render(){
        const selectedSuggestions = this.state.selectedSuggestions.map(selectedSuggestion =>
            <ItemSelectedResults key={selectedSuggestion.id}  item={selectedSuggestion} handleRemoveItem={this.handleRemoveItem}/>);

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Write your search here',
            value,
            onChange: this.onChange
        };
        return(
            <div className="search">
                <div className="input-icons">
                    <i className="close"></i>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        id="search"
                    />
                </div>
                <section>
                    <h2 className="header-search">
                        Search History
                        <a href="#" id="clearHistory" onClick={this.onSelectedSuggestionsClearList}>Clear search history</a>
                    </h2>
                    <ul id="listSelectedResults">
                        {selectedSuggestions}
                    </ul>
                </section>
            </div>
        );
    }
}

export default SimpleSearch;