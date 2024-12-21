from django.forms import BooleanField, CharField, Form, ChoiceField
from core.models import get_state_choices_with_blank
from schools.utilities import distinct_school_lgas_with_blank, distinct_school_types_with_blank

class SchoolFilter(Form):
  school_type = ChoiceField(label='School Type', choices=distinct_school_types_with_blank(), required=False)
  lga_name = ChoiceField(label='LGA', choices=distinct_school_lgas_with_blank(), required=False)
  address_state = ChoiceField(label='State', choices=get_state_choices_with_blank(), required=False)
  school_name = CharField(label='School Name', required=False)
  address_town = CharField(label='Town', required=False)
  active_only = BooleanField(label='Active Only', required=False)

  fields = ['school_name', 'school_type', 'address_town', 'lga_name', 'address_state', 'active_only']

  def __init__(self, initial, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field in ['school_type', 'lga_name', 'address_state']:
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      elif field == 'active_only':
        self.fields[field].widget.attrs.update({'class': 'form-checkbox'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})

      if initial and field in initial:
        self.fields[field].initial = initial[field]