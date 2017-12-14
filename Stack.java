package assignment_3_nghiem;

import java.util.NoSuchElementException;

// stakes for cards
public class Stack {
	protected LinkList top = new LinkList();
	protected int size;

	public Stack()
	{

	}  

	// checks if stack is empty
	public boolean isEmpty()
	{
		if (top.size() == 0)
			return true;
		return false;

	} 

	// get size of stake
	public int getSize()
	{
		return top.size();
	} 
	// adds elements to stakes
	public void push(Object data)
	{
		top.add(data);
	} 

	//remove elements from the stack
	public Object pop()
	{
		if (isEmpty())
			throw new NoSuchElementException("Underflow Exception") ;
		Object store = top.get();
		top.remove();
		return store;
	}  

	// peek at element at the top of stake
	public Object peek()
	{
		if (isEmpty())
			throw new NoSuchElementException("Underflow Exception") ;
		return top.get();
	}


}
