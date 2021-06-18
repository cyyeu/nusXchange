## utils function for calculating exp
import re

def get_module_level(module):
	return int(re.search(r'\d', module).group())
	
def calculate_xp(module, rating):
	mod_level = get_module_level(module)
	xp = rating * mod_level * 10
	return xp