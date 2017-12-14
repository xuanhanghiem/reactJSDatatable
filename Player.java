package assignment_3_nghiem;

public class Player {
	static Card player1[] = new Card[26]; // hand card of user
	static Card computer[] = new Card[26]; // hand card of computer
	static Deck deck = new Deck();	
	private static int counter = 0;

	public Player(){	
	}
	
	// shuffles deck of cards
	void shuffle(){ 
		deck.shuffle();
	}

	// deals num of cards to player's hands
	void Player1(int num){
		for(int i = counter; i < counter + num; i++){
			if (deck.deckSize() == 0) 
					return;
			player1[i] = deck.deal();

		}
		counter = counter + num;
	}

	// initializes hand of computer based on the num of cards
	//in player's hands
	 void Computer(){
		for(int i = 0; i < counter; i++){
			computer[i] = deck.deal();
		}

	} 

	 // reveals hand of the player
	void hand(){
		for(int i = 0; i < counter-1; i++){
			System.out.print(i+1 + ". ");
			deck.info(player1[i]);
			System.out.print(", ");
		}
		System.out.print(counter + ". ");
		deck.info(player1[counter-1]);
		deck.printDeckSize();

	} 
	
	// show hands of the computer -- for testing purposes only
	void computerHand(){
		for(int i = 0; i < counter-1; i++){
			System.out.print(i+1 + ". ");
			deck.info(computer[i]);
			System.out.print(", ");
		}
		System.out.print(counter + ". ");
		deck.info(computer[counter-1]);
		deck.printDeckSize();
	} 

	// switches position between two cards for the player's hands
	void switchCard(int cardNum, int position){
		cardNum--;
		position--;
		Card temp = player1[cardNum];
		player1[cardNum] = player1[position];
		player1[position] = temp;	
	}

	// move hand card to a different position 
	void switchPosition(int cardNum, int position){
		cardNum--;
		position--;
		if (cardNum < 0 || cardNum > 12 || position < 0 
				|| position > 12 ||cardNum-position == 0)
			return; // if out of bound return

		Card temp = player1[cardNum];

		if (Math.abs(cardNum-position) == 1){ // compares position
			player1[cardNum] = player1[position];	
		} else {
			if (cardNum > position) {
				for (int j = cardNum; j > position; j--) {
					player1[j] = player1[j-1];
				}
			} else {
				for (int j = cardNum; j < position; j++) {
					player1[j] = player1[j+1];
				}
			}
		}
		player1[position] = temp;
	}
}
