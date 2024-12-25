package tech.aksaim.model.company;

import tech.aksaim.model.department.Department;
import tech.aksaim.util.Validators;

public class CompanyServices {

    // Check if a company is valid to construct
    public static boolean readyToConstruct(String name, String email) {
        boolean isValid = true;
        if (!Validators.lengthBetween(name, 3, 50)) {
            System.out.println("ERROR: Company name must be between 3 and 50 characters!");
            isValid = false;
        }
        if (!Validators.isValidEmail(email)) {
            System.out.println("ERROR: Company email is not valid!");
            isValid = false;
        }
        return isValid;
    }

    // Add a new department to company
    public static void addDepartment(Company company, Department department) {
        if (company.departments().contains(department)) {
            System.out.println("Department (" + department.id() + ", " + department.name() +")"
                    + "already in Company (" + company.id() + ", " + company.name() +")");
        } else {
            company.departments().add(department);
            department.setCompany(company);
            System.out.println("Department added successfully.");
        }
    }

    // Remove department from a company
    public static void removeDepartment(Company company, Department department) {
        if (company.departments().contains(department)) {
            company.departments().remove(department);
            department.setCompany(null);
        } else {
            System.out.println("Department (" + department.id() + ", " + department.name() +")"
                    + "not in Company (" + company.id() + ", " + company.name() +")");
        }
    }
}
