package assignment_3_nghiem;
// Xuan Ha Nghiem
// September 29, 2016
// The main purpose of this program is to rearrange playing cards
// references 
// https://howtoprogramwithjava.com/enums/
// http://crunchify.com/how-to-implement-a-linkedlist-class-from-scratch-in-java/
// http://codereview.stackexchange.com/questions/62710/
// stack-implementation-using-a-linked-list
import java.util.Scanner;

// initializes hand card for the players in the game, each hand card fixed to 13
// meant for rearranging the cards
public class Play13 {
	public static void main(String[] args) {
		Game game = new Game();
		game.play13(); // initializes playing cards of the players

		boolean condition = true;
		// rearrange cards
		//Scanner in = new Scanner(System.in);
		while (condition) {
			game.switchOrder();
			Scanner in = new Scanner(System.in);
			System.out.println("Continue ordering the cards? 'y' or 'n' ");
			String order = in.nextLine();
			if (order.compareTo("n") == 0)
				condition = false;
		}

	}
}
