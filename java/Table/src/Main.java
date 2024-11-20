import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		ManipulationTableaux mt = new ManipulationTableaux(100);
		mt.menu();

		Scanner sc = new Scanner(System.in);
		int numEle = 0;
		String userChoice;

		while (true) {
			userChoice = mt.getUserInput(sc, false);
			System.out.println();

			switch (userChoice) {
			case "1":
				numEle = mt.addMultipleElements(sc, numEle);
				break;

			case "2":
				mt.displayArray(numEle);
				break;

			case "3":
				System.out.print("$ Enter the element you want to find: ");
				int i = mt.searchArray(sc, numEle);
				if (i < 0) {
					System.out.println("The element you are searching for doesn't exist in the array!\n");
				} else {
					System.out.println("The element " + mt.T[i] + " exists in the array at index " + i + ".\n");
				}
				break;

			case "4":
				mt.sortArray(numEle);
				break;

			case "5":
				System.out.print("$ Enter the element you want to delete: ");
				boolean deleted = mt.deleteElement(sc, numEle);
				if (deleted) {
					System.err.println("The element was deleted successfully.\n");
					numEle--;
				} else {
					System.err.println("Could not delete, the element not in the array!\n");
				}
				break;

			case "6":
				mt.addElement(sc, numEle);
				System.err.println("The element was added successfully.\n");
				numEle++;
				break;

			case "7":
				System.out.println("Exiting the program, Bye!");
					sc.close();
				return;

			default:
				System.out.println("Invalid choice, try again!");
				break;
			}
			mt.menu();
		}
	}
}
