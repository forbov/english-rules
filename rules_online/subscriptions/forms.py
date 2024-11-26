from datetime import datetime
from django.forms import ModelForm, Select, ValidationError
from subscriptions.models import Subscription

class SubscriptionForm(ModelForm):
  class Meta:
    model = Subscription
    fields = ['module']
    widgets = {'module': Select(attrs={'class': 'form-select'})}

  def __init__(self, school_student, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.school_student = school_student

  def clean(self):
    if Subscription.objects.filter(school_student=self.school_student,         
                                   module=self.cleaned_data['module']).exists():
      raise ValidationError('Subscription for this module already exists for this school student')

        # Always return cleaned_data
    return self.cleaned_data
  
  def save(self):
    module = self.cleaned_data['module']
    subscription = Subscription.objects.create(school_student=self.school_student,
                                               module=module,
                                               created_at=datetime.now())
    return subscription
