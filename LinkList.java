package assignment_3_nghiem;

public class LinkList {
	private static int counter;
	private Node head;

	public LinkList() {
	}

	public void add(Object data) {
		// case list is empty
		if (head == null) {
			head = new Node(data);
		}
		Node temp = new Node(data);
		Node crunchifyCurrent = head;

		// append data to beginning of list
		temp.setNext(crunchifyCurrent.getNext());
		crunchifyCurrent.setNext(temp);

		// increment the number of elements variable
		incrementCounter();
	} 


	private static int getCounter() {
		return counter;
	}

	private static void incrementCounter() {
		counter++;
	}

	private void decrementCounter() {
		counter--;
	}


	public Object get()
	// returns the 1st element of the list.
	{
		Node crunchifyCurrent = null;

		if (head != null) {
			crunchifyCurrent = head.getNext();
			return crunchifyCurrent.getData();
		}
		return crunchifyCurrent;

	} 

	public boolean remove() 
	{
		Node crunchifyCurrent = head;

		if (head != null) {
			// deletes element at the beginning of the list
			crunchifyCurrent.setNext(crunchifyCurrent.getNext().getNext());

			// decrement the number of elements variable
			decrementCounter();
			return true;
		}
		return false;
	}


	public int size() {
		return getCounter();
	}

}
