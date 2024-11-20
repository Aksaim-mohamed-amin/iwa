// Superclass Vehicle
public class Vehicle {
    public void move() {
        System.out.println("The vehicle is moving.");
    }
}

// Subclass Car extends Vehicle
class Car extends Vehicle {
    // Overriding the move() method to provide a Car-specific message
    @Override
    public void move() {
        System.out.println("The car is driving.");
    }

    // Adding a stop() method to the Car class
    public void stop() {
        System.out.println("The car has stopped.");
    }
} 

// Subclass Bicycle extends Vehicle
class Bicycle extends Vehicle {
    // Overriding the move() method to provide a Bicycle-specific message
    @Override
    public void move() {
        System.out.println("The bicycle is pedaling.");
    }

    // Adding a stop() method to the Bicycle class
    public void stop() {
        System.out.println("The bicycle has stopped.");
    }
}