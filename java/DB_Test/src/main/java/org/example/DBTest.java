package org.example;

import java.sql.*;
import java.util.Scanner;

public class DBTest {
    public static void main(String[] args) {

        String dbUrl = "jdbc:mysql://localhost:3306/testdb";
        String dbUserName = "root";
        String dbPassword = "15033601";

        try {
            Connection connection = DriverManager.getConnection(dbUrl, dbUserName, dbPassword);
            System.out.println("Conected succsfully");

            String sql = "INSERT INTO users VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);

            Scanner sc = new Scanner(System.in);
            System.out.print("Enter user Id: ");
            int id = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter user name: ");
            String name = sc.nextLine();

            System.out.print("Enter user email: ");
            String email = sc.nextLine();

            statement.setInt(1,id);
            statement.setString(2, name);
            statement.setString(3,email);

            int rs = statement.executeUpdate();

            if (rs != 0) {
                System.out.println("User added Succsufully.");
            }



        } catch ( SQLException e) {
            throw new RuntimeException(e);
        }


    }
}