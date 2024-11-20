import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;


public class characterFrequency {
    
    // Class for each letter and it count
    static class CharacterCount{
        char value;
        int count;

        public CharacterCount(char letter) {
            this.value = letter;
            this.count = 1;
        }

        public void incrementCount() {
            this.count++;
        }
    }

    public static void main(String[] args) {
        String filePath = "/Users/mohamedaminaksaim/Programing/Master_IWA/java/Devoir/IO/src/test.txt";
        ArrayList<CharacterCount> charactersList = new ArrayList<>();

        try {
            FileReader reader = new FileReader(filePath);
            int letter;

            while ((letter = reader.read()) != -1) {
                char characterScaned = (char) letter;
                if (!Character.isLetter(characterScaned)) {
                    continue;
                }

                boolean characterExists = false;
                for (CharacterCount character : charactersList) {
                    if (character.value == characterScaned) {
                        character.incrementCount();
                        characterExists = true;
                        break;
                    }
                }

                if (!characterExists) {
                    charactersList.add(new CharacterCount(characterScaned));
                }
            }
            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        // Sort and Print the characters and thier count
        Collections.sort(charactersList, new Comparator<CharacterCount>() {
            @Override
            public int compare(CharacterCount ch1, CharacterCount ch2) {
                return Integer.compare(ch2.count, ch1.count);
            }
        });
        for (CharacterCount character : charactersList) {
            System.out.println(character.value + ": " + character.count);
        }
    }
}
