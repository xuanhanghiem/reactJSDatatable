package assignment_3_nghiem;

import java.util.Scanner;

public class Game {
	static Player player = new Player();
	static Player computer1 = new Player();
	static Player computer2 = new Player();
	static Player computer3 = new Player();

	// main program for testing purposes only
	public static void main(String[] args) {
		Player player = new Player();
		Player computer1 = new Player();
		Player computer2 = new Player();
		Player computer3 = new Player();
		player.shuffle();
		System.out.println("-----------------------");
		System.out.println("Testing purposes only.");
		System.out.println("Deal 2 cards");
		player.Player1(2); // ony one player against mult. programmed players
		player.hand();
		System.out.println();
		System.out.println("Deal 5 cards");
		player.Player1(5);
		player.hand();
		System.out.println();
		System.out.println("Deal 6 cards");
		player.Player1(6);
		player.hand();
		System.out.println();
		System.out.println("Computer 1 deal 13 cards"); // initializes hand cards of 
		//computer players
		computer1.Computer();
		computer1.computerHand();
		System.out.println();
		System.out.println("Computer 2 deal 13 cards");
		computer2.Computer();
		computer2.computerHand();
		System.out.println();
		System.out.println("Computer 3 deal 13 cards");
		computer3.Computer();
		computer3.computerHand();
		System.out.println();

		// tests functions for switching cards based on two positions
		System.out.println("Switch card at 2nd position with card at 5th position.");
		player.switchCard(2, 5);
		player.hand();
		System.out.println();
		System.out.println("Move card at 2nd position to 5th position.");
		player.switchPosition(2, 5);
		player.hand();
		System.out.println();
		System.out.println("Testing purposes only.");
		System.out.println("-----------------------");
	}

	public Game() {

	}

	// initializes variables for card game with 13 cards
	public void play13(){
		player.shuffle();
		// determines how many players are playing 2-4 only
		System.out.print("How many players including yourself(2-4)? ");
		Scanner in = new Scanner(System.in);
		int num = in.nextInt();
		// initializes and prints hand cards
		player.Player1(13);
		System.out.println("Your Cards");
		player.hand();
		System.out.println();
		if (num < 2 || num > 4) {
			return;
		}

		// initializes hand card of computer players
		if (num >= 2) {
			computer1.Computer();
			System.out.println("Computer 1");
			computer1.computerHand();
			System.out.println();
		}
		if (num >= 3) {
			computer2.Computer();
			System.out.println("Computer 2");
			computer2.computerHand();
			System.out.println();
		} 
		if (num == 4) {
			computer3.Computer();
			System.out.println("Computer 3");
			computer3.computerHand();
			System.out.println();
		} 

	} 

	// function switches order of hand cards for player
	void switchOrder() {
		System.out.println("Move card or switch positions? "
				+ "Enter 'm' or 's'");
		Scanner in = new Scanner(System.in);
		String order = in.nextLine();
		int index; // card index that is to move
		int position; // index the position to move the card to
		if (order.compareTo("m") == 0) {
			System.out.println("Move number to which position? ");
			System.out.println("Index: ");
			index = in.nextInt();
			System.out.println("Position: ");
			position = in.nextInt();

			player.switchCard(index, position);

		} else if (order.compareTo("s") == 0) {
			System.out.println("Switch which numbers(1-13 only)? ");
			System.out.println("Index: ");
			index = in.nextInt();
			System.out.println("Position: ");
			position = in.nextInt();

			player.switchPosition(index, position);

		}

		
		System.out.println("Your Cards");
		player.hand();
		System.out.println();	
	}
}
