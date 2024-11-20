"""
Data for tests
"""
list1 = []
list2 = [0, 1, 2, 3, 4, 5, 6, 0, 4, 0, 2, 0, 0]
list3 = ['mohamed', 'amin', 'ahmed', 'mohamed', 'amin', 'yassine', 'amin']
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]

tuple1 = (1, 2, 3, 4, 5, 6, 8)
tuple2 = (3, 4, 5, 6, 7)

set1 = {1, 2, 3, 4}
set2 = {1, 2, 3, 4, 5, 6, 7, 8}



"""
Exercice 1:
Écrivez un programme Python pour compter les occurrences d'un élément spécifique 
dans une liste donnée.
"""
def num_of_occurrences(lst, ele):
    """Count the number of occurrences of ele in a list lst"""
    count = 0
    for e in lst:
        if e == ele:
            count += 1
    return count

def num_of_occurrences_using_count(lst, ele):
    """Count the number of occurrences of ele in a list lst using the built-in .count()"""
    return lst.count(ele)

# Test cases
print(num_of_occurrences(list1, 4) == 0)
print(num_of_occurrences(list2, 0) == 5)
print(num_of_occurrences(list3, 'mohamed') == 2)

print(num_of_occurrences_using_count(list1, 4) == 0)
print(num_of_occurrences_using_count(list2, 4) == 2)
print(num_of_occurrences_using_count(list3, 'amin') == 3)



"""
Exercice 2:
Écrivez un programme Python pour supprimer les doublons d'une liste donnée
tout en préservant l'ordre des éléments.
"""
def remove_duplicate(lst):
    """Remove duplicate items from a list"""
    tmp_list = []
    for e in lst:
        if e not in tmp_list:
            tmp_list.append(e)
    return tmp_list

# Test cases
print(remove_duplicate(list1) == [])
print(remove_duplicate(list2) == [0, 1, 2, 3, 4, 5, 6])
print(remove_duplicate(list3) == ['mohamed', 'amin', 'ahmed', 'yassine'])



"""
Exercice 3:
Étant donné une liste de listes imbriquées,
écrivez un programme Python pour concaténer toutes les sous-listes en une seule liste plate.
"""
def flatten(nested_list):
    return [ele for lst in nested_list for ele in lst]

# Test case
print(flatten(nested_list) == [1, 2, 3, 4, 5, 6, 7, 8, 9])



"""
Exercice 4:
Étant donné deux tuples d'entiers, écrivez un programme Python pour effectuer l'addition,
la soustraction et la multiplication élément par élément et créer de nouveaux tuples pour chaque opération.
"""
def tuple_operations(t1, t2):
    """Preform addition substracting and multiplication on two tuples, return the results in a tuples"""
    # Determine the largest lenght and pad the short tuple with zeros
    lenght = max(len(t1), len(t2))
    t1 = t1 + (0, ) * (lenght - len(t1))
    t2 = t2 + (0, ) * (lenght - len(t2))

    # Declare list to hold the result of each operation
    add = []
    sub = []
    mul = []

    # Loop on the tuples and append the result of each operation to it list
    for i in range(lenght - 1):
        add.append(t1[i] + t2[i])
        sub.append(t1[i] - t2[i])
        mul.append(t1[i] * t2[i])
    
    # transfer the result lists into tuples and return them
    return tuple(add), tuple(sub), tuple(mul)

add, sub, mul = tuple_operations(tuple1, tuple2)
print(add, sub, mul, sep='\n')



"""
Exercice 5:
Étant donnés deux ensembles A et B, écrivez un programme Python 
pour vérifier si l'ensemble A est un sous-ensemble de l'ensemble B et afficher le résultat.
"""
def is_subset(s1, s2):
    """Check if the set s1 is subset of the set s2"""
    return s1.issubset(s2)

print(is_subset(set1, set2))



"""
Exercice 6:
Écrivez un programme Python qui prend une chaîne en entrée 
et crée un dictionnaire contenant chaque caractère comme clé et sa fréquence comme valeur.
"""
def char_frequency(input_string):
    """Create a dictionary of letters and thier frequency"""
    dic = {}
    for c in input_string:
        dic[c] = input_string.count(c)

    return dic


my_dict = char_frequency('Aksaim Mohamed Amin')
print(my_dict)