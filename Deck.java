package assignment_3_nghiem;

public class Deck {
	static Stack deck = new Stack();
	Card hand[] = new Card[52];
	// initializes standard deck
	public Deck(){
		deck = new Stack();
		Card card[] = new Card[52];
		int e = 0;
		for (int i=0; i<13; i++) {
			for (int j=0; j < 4; j++){
				card[e] = new Card(Rank.values()[i],
						Suit.values()[j]);
				e++;
			}
		}

		for (int i = 0; i < 52; i++) {
			deck.push(card[i]); // combine card into stack
		}
	} 

	// shuffles card
	void shuffle(){		
		Card tempDeck[] = new Card[52];
		for ( int i = 0; i < 52; i++ ) {
			tempDeck[i] = (Card) deck.pop();
		}

		for ( int i = 51; i > 0; i-- ) {
			int rand = (int)(Math.random()*(i+1));
			Card temp = tempDeck[i];
			tempDeck[i] = tempDeck[rand];
			tempDeck[rand] = temp;

		}
		for (int i = 0; i < 52; i++) {
			deck.push(tempDeck[i]);
		}

	}

	// deal one card at a time
	public Card deal(){	
		return Card.class.cast(deck.pop());
	}

	//replaces card into deck
	void replace(Card card){
		deck.push(card);	
	}

	// retrieves current deck size
	int deckSize(){
		return deck.getSize();
	}

	// prints how many cards left in deck
	void printDeckSize(){
		System.out.println();
		System.out.print("Size of Deck: " + deck.getSize());
		if (deck.isEmpty()) {
			System.out.println();
			System.out.print("Out Of Cards");
		}
	}

	// print type of card one by one
	void info(Card card) {
		System.out.print(card.getCardValue() + " OF " + card.getSuit());
	} 

}
