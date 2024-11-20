#!/usr/bin/env python3
"""Class to represent complex numbers and perform arithmetic operations on them."""

class Complex:
    def __init__(self, real, imag):
        """
        Initialize the complex number with the given real and imaginary parts.
        Args:
            real: The real part of the complex number.
            imag: The imaginary part of the complex number.
        """
        self.real = real
        self.imag = imag
        
    def __repr__(self):
        """
        Return a string representation of the complex number.
        """
        return f"{self.real} + {self.imag}i"
    
    def __add__(self, other):
        """
        Define the addition operation for complex numbers
        Args:
            slef: The first complex number.
            other: The second complex number.
        Returns: The addition of the two complex numbers.
        """
        return Complex(self.real + other.real, self.imag + other.imag)
    
    def __mul__(self, other):
        """
        Define the multiplication operation for complex numbers.
        Args:
            slef: The first complex number.
            other: The second complex number.
        Returns: The multiplication of the two complex numbers.
        """
        real_part = self.real * other.real - self.imag * other.imag
        imag_part = self.real * other.imag + self.imag * other.real
        return Complex(real_part, imag_part)
    

# Test Code
z1 = Complex(1, 2)
print(z1)

# Create a list of complex numbers and print it
z2 = Complex(3, 5)
z3 = Complex(7, 11)
z4 = Complex(6, 21)
complex_list = [z1, z2, z3, z4, Complex(9, 10)]
complex_list.append(Complex(7, 8))

for z in complex_list:
    print(z)


# Test the addition of two complex numbers
z_sum = z1 + z2
print(f'Sum of {z1} and {z2} is {z_sum}')

# Test the multiplication of two complex numbers
z_mul = z1 + z2
print(f'Product of {z1} and {z2} is {z_sum}')