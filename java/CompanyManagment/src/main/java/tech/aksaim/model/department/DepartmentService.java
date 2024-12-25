package tech.aksaim.model.department;

import tech.aksaim.util.Validators;

public class DepartmentServices {

    // Check if a department is valid to construct
    public static boolean readyToConstruct(String name, String email) {
        boolean isValid = true;
        if (!Validators.lengthBetween(name, 2, 50)) {
            System.out.println("ERROR: Company name must be between 2 and 50 characters!");
            isValid = false;
        }
        if (!Validators.isValidEmail(email)) {
            System.out.println("ERROR: Company email is not valid!");
            isValid = false;
        }
        return isValid;
    }

    public static boolean readyToSave(Department department) {
        boolean isReady = true;
        if (department.company() == null) {
            System.out.println("Department needs to be assigned to a company before saving!");
            isReady = false;
        }

        if (department.manager() == null) {
            System.out.println("Department needs a manager before saving!");
            isReady = false;
        }
        return isReady;
    }
}