from django.contrib import admin

# Register your models here.
from .models import Subscription, SubscriptionExercise, SubscriptionExerciseItem, SubscriptionSheet

admin.site.register(Subscription)
admin.site.register(SubscriptionSheet)
admin.site.register(SubscriptionExercise)
admin.site.register(SubscriptionExerciseItem)
