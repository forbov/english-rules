from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

from core.models import get_module_level_description

# Create your models here.

class Module(models.Model):
    name = models.CharField(max_length=50, null=False, unique=True)
    level = models.CharField(max_length=20, null=False)
    description = CKEditor5Field('Description', config_name='extends')

    def level_description(self):
        return get_module_level_description(self.level)
    
    # Add other fields if needed
