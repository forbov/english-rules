from django.contrib import admin
from modules.models import ExerciseType, Module, Sheet, SheetExercise, SheetExerciseItem

# Register your models here.
admin.site.register(Module)
admin.site.register(Sheet)
admin.site.register(SheetExercise)
admin.site.register(SheetExerciseItem)
admin.site.register(ExerciseType)