# Helpers module
import numpy as np


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

