public class MyArrayList <Type>{
    Object[] objectArr = new Object[10];

    @SuppressWarnings("unchecked")
    Type[] arr = (Type[]) objectArr;

    int size = 10;
    int numEle = 0;

    public void add(Type ele) {
        if (numEle < size) {
            arr[numEle] = ele;
            numEle++;
        } else {
            System.out.println("Let realocate later");
        }
    }
}
