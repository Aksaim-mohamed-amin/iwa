abstract class Employee {
    protected String name;
    protected double salary;

    // Constractor
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // Abstract method must be present in the childs classes
    public abstract double calculateBonus();

    // show employee details
    public void showEmployeeDetails() {
        System.out.println("Employee Name: " + this.name);
        System.out.println("Employee Salary: " + this.salary);
        System.out.println("Employee Bonus: " + calculateBonus());
    }
}

class Manager extends Employee {
    // initialisation of a new instance
    public Manager(String name, double salary) {
        super(name, salary);
    }

    // over ride the abstract method
    @Override
    public double calculateBonus() {
        return salary * 0.05;
    }
}

class Engineer extends Employee {
    // initialisation of a new instance
    public Engineer(String name, double salary) {
        super(name, salary);
    }

    // over ride the abstract method
    @Override
    public double calculateBonus() {
        return salary * 0.10;
    }
}