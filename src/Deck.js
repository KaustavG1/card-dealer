import React, { Component } from 'react';
import Card from './Card';
import './Deck.css'

const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

class CardTable extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, cards: [] };
        this.handleClick = this.handleClick.bind(this);
    }
    
    // Component Did Mount fetch - then version
    /* componentDidMount() {
        fetch(API_URL)
        .then(resp => resp.json())
        .then(result => this.setState({ deck: result,
                                        deckID: result.deck_id,
                                        rem: result.remaining,
                                        shuffled: result.shuffled,
                                        success: result.success
        }));
    } */

    // Component Did Mount async await version
    async componentDidMount() {
        let deck = await fetch(API_URL);
        let jsonDeck = await deck.json();
        this.setState({ deck: jsonDeck });
    }
    
    // handle click fetch - then version
    /* handleClick(e) {
        fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`)
        .then(resp => resp.json())
        .then(result => this.setState({ 
            cardImg: result.cards[0].images.png,
            rem: resp.remaining
        }))
        .catch(console.log('Error!'));
    } */

    // handle click async await version
    async handleClick(e) {
        try{
            let card = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`);
            let resp = await card.json();
            if(!resp.remaining) {
                alert('No Cards Left');
            }
            else {
                this.setState(st => ({
                    cards: [...st.cards, { 
                        id: resp.cards[0].code,
                        image: resp.cards[0].image,
                        name: `${resp.cards[0].value} of ${resp.cards[0].suit}`
                    }]
                }));
            }
        } catch {
            console.log('Error!');
        }
    }

    render() {
        const cards = this.state.cards.map(card => <Card key={card.id} 
                                                         id={card.id} 
                                                         image={card.image} 
                                                         alt={card.name}/>);
        return (<div>
            <div className='Headers'>
                <h1>♦ CARD DEALER ♦</h1>
                <h5>♦ A LITTLE DEMO MADE WITH REACT ♦</h5>
            </div>
            <button onClick={this.handleClick} className='Deck-btn'>GET CARD!</button>
            <div className='Deck-Area'>
                {cards}
            </div>
        </div>);
    }
}

export default CardTable;