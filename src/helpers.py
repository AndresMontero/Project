# Helpers module
import numpy as np
from IPython.display import display


def neg_to_zero(quantity):
    """Function to clean negative albums

    Args:
        quantity:  quantity.
    Returns:
        new_quantity: Cleaned quantity.
    """
    
    if quantity <= 0:
        new_quantity = 0
    else:
        new_quantity = quantity

    # Round quantity to not have float quantities
    return np.rint(new_quantity)


def eq_ign_case(a, b):
    """Function to compare string ignoring the case

    Args:
        a:  string.
        b:  string.
    Returns:
        Boolean if they are equal ignoring the case
    """
    return a.str.lower() == b.str.lower()


def pretty_print(df, name, debug=False):
    print('{name} size: {size}'.format(name=name,
                                       size=len(df)))
    if debug:
        print('\nNaN count by column:\n{}'.format(df.isna().sum(axis=0)))
    display(df.head())


def not_eq_ign_case(a, b):
    """Function to compare string ignoring the case

    Args:
        a:  string.
        b:  string.
    Returns:
        Boolean if they are not equal ignoring the case
    """
    return ~eq_ign_case(a, b)


def uniq(a):
    return list(set(a))

