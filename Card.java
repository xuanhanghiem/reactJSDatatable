package assignment_3_nghiem;

public class Card {
	private Suit suit; // suit of card
	private Rank cardValue; // rank of card
	// declare card
	public Card (Rank cardValue, Suit suit)
	{
		this.cardValue = cardValue;
		this.suit = suit;
	}

	public Suit getSuit()
	{
		return suit;
	}

	public void setSuit(Suit suit)
	{
		this.suit = suit;
	}

	public Rank getCardValue()
	{
		return cardValue;
	}

	public void setCardValue(Rank cardValue)
	{
		this.cardValue = cardValue;
	}


}
