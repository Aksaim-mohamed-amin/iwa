import java.util.UUID;

public class BankAccount {
    private UUID accountNumber;
    private String ownerName;
    private double balance;

    // Initialize a new account using ownername
    public BankAccount(String ownerName) {
        this.ownerName = ownerName;
        this.balance = 0.0;
        this.accountNumber = UUID.randomUUID();
    }

    // Getter for account number
    public UUID getAccountNumber() {
        return this.accountNumber;
    }

    // Getter and Setter for owner name
    public String getOwnerName() {
        return this.ownerName;
    }

    public void setOwnerName(String newName) {
        this.ownerName = newName;
    }

    // Getter for balance
    public double getBalance() {
        return this.balance;
    }

    public void setBalance(double newBalance) {
        this.balance = newBalance;
    }

    // Deposit method
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Deposit successful! New balance: " + this.balance);
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }

    // Withdraw method
    public void withdraw(double amount) {
        if (amount > 0) {
            if (this.balance >= amount) {
                this.balance -= amount;
                System.out.println("Withdrawal successful! New balance: " + this.balance);
            } else {
                System.out.println("Insufficient funds. Current balance: " + this.balance);
            }
        } else {
            System.out.println("Invalid withdrawal amount.");
        }
    }
}