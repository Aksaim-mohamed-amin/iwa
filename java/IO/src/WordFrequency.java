import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Scanner;

public class WordFrequency {

    // Custom class for word and it count    
    static class WordCount {
        String value;
        int count;

        public WordCount(String word) {
            this.value = word;
            this.count = 1;
        }

        // Increment the count
        public void incrementCount() {
            this.count++;
        }
    }

    public static void main(String[] args) {
        String filePath = "/Users/mohamedaminaksaim/Programing/Master_IWA/java/Devoir/IO/src/test.txt";
        ArrayList<WordCount> wordsList = new ArrayList<>();
        
        try {
            Scanner scanner = new Scanner(new File(filePath));
            
            while (scanner.hasNext()) {
                String wordScanned = scanner.next();
                wordScanned = wordScanned.replaceAll("[^a-zA-Z0-9]", "");

                boolean wordExists = false;
                for (WordCount word : wordsList) {
                    if (word.value.equals(wordScanned)) {
                        word.incrementCount();
                        wordExists = true;
                        break;
                    }
                }

                if (!wordExists) {
                    wordsList.add(new WordCount(wordScanned));
                }
            }
            
            scanner.close();

        } catch (FileNotFoundException e) {
            System.err.println("File Not Found!");
            e.printStackTrace();
        }

        // Sort and print the result
        Collections.sort(wordsList, new Comparator<WordCount>() {
            @Override
            public int compare(WordCount word1, WordCount word2) {
                return Integer.compare(word2.count, word1.count);
            }
        });
        for (WordCount word : wordsList) {
            System.out.println(word.value + ": " + word.count);
        }
    }
}