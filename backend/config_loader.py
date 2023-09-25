import os

# Default configuration
from config import *

profile = os.environ.get('PROFILE')

if profile == 'prod':
    from config.config_prod import *
elif profile == 'test':
    from config.config_test import *
elif profile == 'remote-mongo':
    from config.config_test_remote_mongo import *
