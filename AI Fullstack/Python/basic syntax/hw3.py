height = input("Please enter your height in meters: ")
height = float(height)
weight = input("Please enter your weight in kilograms: ")
weight = float(weight)

BMI_value = weight / height**2
BMI_value = round(BMI_value, 2)

print(f"Your BMI value is: {BMI_value}")

print(f"Health: ", end="")
if BMI_value < 18.5:
    print("underweight")
elif 18.5 <= BMI_value <= 24:
    print("normal weight")
elif 24 <= BMI_value < 28:
    print("overweight")
elif BMI_value >= 28:
    print("obese")

print("Health recommendations: ", end="")
if BMI_value < 18.5:
    print(
        "Increase nutritional intake appropriately and engage in moderate physical activity."
    )
elif 18.5 <= BMI_value <= 24:
    print("Maintain healthy lifestyle habits.")
elif 24 <= BMI_value < 28 or BMI_value >= 28:
    print("Manage your diet and increase physical activity.")
