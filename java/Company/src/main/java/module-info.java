module tech.aksaim.app {
    // Required JavaFX modules
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;

    // Hibernate and JPA modules
    requires org.hibernate.orm.core;
    requires jakarta.persistence;

    // Other required modules
    requires java.sql;
    requires java.naming;
    requires com.google.protobuf;
    requires jbcrypt;

    // Open packages for reflection (necessary for FXML loading)
    opens tech.aksaim.view.login to javafx.fxml;
    opens tech.aksaim.view.dashboard.admin to javafx.fxml;

    // Open the package for Hibernate reflection
    opens tech.aksaim.app.company to org.hibernate.orm.core;
    opens tech.aksaim.app.department to org.hibernate.orm.core;
    opens tech.aksaim.app.user to org.hibernate.orm.core;
    opens tech.aksaim.app.project to org.hibernate.orm.core;

    // Export the main package
    exports tech.aksaim;

    // Export specific view packages to be used by other parts of the application
    exports tech.aksaim.view.sceneManager;
    exports tech.aksaim.view.dashboard.admin;
    exports tech.aksaim.view.login;
    opens tech.aksaim.app.user.admin to org.hibernate.orm.core;
    opens tech.aksaim.app.user.employee to org.hibernate.orm.core;
    opens tech.aksaim.app.user.manager to org.hibernate.orm.core;
}