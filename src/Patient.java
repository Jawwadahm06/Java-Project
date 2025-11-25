public class Patient {
    private static int idCounter = 1;
    private int id;
    private String name;
    private int age;
    private String gender;

    public Patient(String name, int age, String gender) {
        if (age <= 0) {
            throw new IllegalArgumentException("Age must be positive.");
        }
        if (!gender.equalsIgnoreCase("Male") &&
                !gender.equalsIgnoreCase("Female") &&
                !gender.equalsIgnoreCase("Other")) {
            throw new IllegalArgumentException("Invalid gender specified. Must be Male, Female, or Other.");
        }

        this.id = idCounter++;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    @Override
    public String toString() {
        return "Patient ID: " + id + ", Name: " + name + ", Age: " + age + ", Gender: " + gender;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Patient patient = (Patient) obj;
        return id == patient.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}

