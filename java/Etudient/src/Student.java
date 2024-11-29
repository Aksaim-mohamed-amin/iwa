import java.util.Comparator;

public class Student {
    int id, age;
    String userName;

    public Student(int id, String userName, int age) {
        this.id = id;
        this.userName = userName;
        this.age = age;
    }

    @Override
    public String toString() {
        return String.format("Student (%d): [%s, %d]", this.id, this.userName, this.age);
    }

    // Sort Students By id
    public static class SortById implements Comparator<Student> {
        @Override
        public int compare(Student a, Student b) {
            return a.id - b.id;
        }
    }

    // Sort students by age
    public static class SortByAge implements Comparator<Student> {
        @Override
        public int compare(Student a, Student b) {
            return a.age - b.age;
        }
    }

    // Sort students by name
    public static class SortByName implements Comparator<Student> {
        @Override
        public int compare(Student a, Student b) {
            return a.userName.compareTo(b.userName);
        }
    }
}
