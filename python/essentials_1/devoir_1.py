# Exercice 1 *
name = input("What is your name ?")
age = input("How old are you ?")
fav_color = input("What is your favorite color ?")

print(f'Hello {name}!, you are {age} years old, and your favorite color is {fav_color}.')



# Exercice 2 *
def addition(num1, num2):
    return num1 + num2

print(f"The additionod the two numbers is: {addition(5, 8)}")



# Exercice 3 *
def is_eligible(user_age):
    return user_age >= 18

user_age_input = input("Please enter your age: ")

if user_age_input.isdigit():
    user_age = int(user_age_input)
    if is_eligible(user_age):
        print("Congratulations, you are eligible to vote!")
    else:
        print("Unfortunately, you are not eligible for voting. You should be 18 or older.")
else:
    print("Please enter a valid number.")



# Exercice 4 **
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))
num3 = float(input("Enter the third number: "))

average = (num1 + num2 + num3) / 3
if average > 10:
    print(f"The average is {average}, which is greater than 10.")
elif average < 10:
    print(f"The average is {average}, which is less than 10.")
else:
    print(f"The average is {average}, which is exactly 10.")



# Exercice 5 ***
def is_valid_password(password):
    if len(password) < 8:
        return False

    has_upper, has_lower, has_digit = False, False, False

    for char in password:
        if char.isupper():
            has_upper = True
        elif char.islower():
            has_lower = True
        elif char.isdigit():
            has_digit = True

    return has_upper and has_lower and has_digit

password = input("Please enter a password: ")

if is_valid_password(password):
    print("Your password is valid.")
else:
    print("Your password is invalid. It must meet the following criteria:")
    print("- At least 8 characters long")
    print("- Contains both uppercase and lowercase letters")
    print("- Contains at least one digit")