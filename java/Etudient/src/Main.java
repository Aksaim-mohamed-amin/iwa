import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {

        ArrayList<Student> studentList = new ArrayList<>();

        studentList.add(new Student(1, "Amin", 29));
        studentList.add(new Student(2, "Anass", 28));
        studentList.add(new Student(3, "Yassine", 30));
        studentList.add(new Student(4, "Salah", 22));

        System.out.println("Normal order");
        for (Student student : studentList) {
            System.out.println(student);
        }

        System.out.println("Sorted by id");
        studentList.sort(new Student.SortById());
        for (Student student : studentList) {
            System.out.println(student);
        }

        System.out.println("Sorted by age");
        studentList.sort(new Student.SortByAge());
        for (Student student : studentList) {
            System.out.println(student);
        }

        System.out.println("Sorted by name");
        studentList.sort(new Student.SortByName());
        for (Student student : studentList) {
            System.out.println(student);
        }
    }
}