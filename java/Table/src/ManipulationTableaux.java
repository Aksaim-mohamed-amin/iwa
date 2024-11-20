import java.util.Scanner;

public class ManipulationTableaux {
    int[] T;

    /**
     * Constructe a new ManipulationTableaux object
     * 
     * @param n The size of the array
     */
    public ManipulationTableaux(int n) {
        T = new int[n];
    }

    // Display the menu
    public void menu() {
        System.out.println("1: Enter multiple elements into the array.");
        System.out.println("2: Display the elements in the array.");
        System.out.println("3: Search for an element in the array.");
        System.out.println("4: Sort the elements in the array.");
        System.out.println("5: Delete an element from the array.");
        System.out.println("6: Add an element to the array.");
        System.out.println("7: Exit.");
        System.out.print("\nYour choice: ");
    }

    /**
     * Get an integer from the user or the char Q, if he input another type of data,
     * repeat the process until he inputs an integer.
     * 
     * @param sc The current scanner
     * @param qMode Indicate if the character Q is allowed in the input or not
     * @return The user input as a (String)
     */
    public String getUserInput(Scanner sc, boolean qMode) {
        String input;

        while (true) {
            input = sc.nextLine();

            // catch the case when scanning for letter q 
            if (qMode && input.equalsIgnoreCase("q")) {
                return input;
            }

            try {
                Integer.parseInt(input);
                return input;
            } catch (NumberFormatException e){
                System.err.println("Please Enter a valid integer, or Q to finish!");
            }
        }
    }

    /**
     * Add Multiple elements to the array, if user input Q stops.
     * 
     * @param sc The current scanner.
     * @param numEle number of the elements currently in the array.
     * @return numEle after adding the new elements.
     */
    public int addMultipleElements(Scanner sc, int numEle) {
        System.out.println("$ Enter the new Elements (Integers), or type Q to stop: ");

        String userInput = getUserInput(sc, true);
        while (!userInput.equalsIgnoreCase("q")) {
            if (numEle >= T.length) {
                T = realloc(T, T.length * 2);
            }

            T[numEle] = Integer.parseInt(userInput);
            numEle++;
            userInput = getUserInput(sc, true);
        }
        System.out.println("\nYour new elements was added successfully.\n");
        return numEle;
    }

    /**
     * Display the element of the array.
     * 
     * @param numEle number of the elements currently in the array.
     */
    public void displayArray(int numEle) {
        System.out.print("[");
        for (int i = 0; i < numEle; i++) {
            System.out.print(T[i]);
            if (i < numEle - 1) System.out.print(", ");
        }
        System.out.println("]\n");
    }

    /**
     * Search the array for an elements.
     * 
     * @param sc The current scanner.
     * @param numEle number of the elements currently in the array.
     * @return The index of the element searching for it.
     */
    public int searchArray(Scanner sc, int numEle) {
        int ele = Integer.parseInt(getUserInput(sc, false));
        
        for (int i = 0; i < numEle; i++) {
            if (T[i] == ele) return i;
        }
        
        return -1;
    }

    /**
     * Sort the array.
     * 
     * @param numEle number of the elements currently in the array.
     */
    public void sortArray(int numEle) {
        int end = numEle - 1;
        boolean sorted = false;

        while (!sorted) {
            sorted = true;
            for (int i = 0; i < end; i++) {
                if (T[i] > T[i + 1]) {
                    int tmp = T[i];
                    T[i] = T[i + 1];
                    T[i + 1] = tmp;
                    sorted = false;
                }
            }
        }
        System.out.println("Array sorted successufully.\n");
    }


    /**
     * Delete Element from the array.
     * 
     * @param numEle number of the elements currently in the array.
     * @retuen true if the item deleted, false otherwise.
     */
    public boolean deleteElement(Scanner sc, int numEle) {
        int index = searchArray(sc, numEle);

        if (index < 0) return false;

        for (int i = index; i < numEle; i++) {
            T[i] = T[i + 1];
        }
        return true;
    }

    /**
     * Add one elemet to the array.
     * 
     * @param numEle number of the elements currently in the array.
     * @retuen the index of the new element.
     */
    public int addElement(Scanner sc, int numEle) {
        System.out.print("Enter the element you want to add: ");
        int ele = Integer.parseInt(getUserInput(sc, false));

        if (numEle >= T.length) {
            T = realloc(T, T.length * 2);
        }

        T[numEle] = ele;
        return numEle;
    }

    /**
     * Realloc a new array with bigger size.
     * 
     * @param T the old array.
     * @param newSize The new size.
     * @return the new array
     */
    public int[] realloc(int[] T, int newSize) {
        int[] newArr = new int[newSize];

        for (int i = 0; i < T.length; i++) {
            newArr[i] = T[i];
        }

        return newArr;
    }
}