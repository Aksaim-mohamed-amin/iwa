interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

interface Walkable {
    void walk();
}

class Duck implements Flyable, Swimmable, Walkable {
    @Override
    public void fly() {
        System.out.println("Duck can fly");
    }

    @Override
    public void swim() {
        System.out.println("Duck can swim");
    }

    @Override
    public void walk() {
        System.out.println("Duck can walk");
    }
}

class Fish implements Swimmable{
    @Override
    public void swim() {
        System.out.println("Fish can swim");
    }
}

public class Animal {
    public static void main(String[] args) {
        Duck duck = new Duck();
        Fish fish = new Fish();

        duck.fly();
        duck.swim();
        duck.walk();

        fish.swim();
    }
}