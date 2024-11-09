from django.forms import CharField, Form, ChoiceField
from core.models import get_gender_choices_with_blank, get_group_choices_with_blank


class UserFilter(Form):
  first_name = CharField(label='First Name', required=False)
  last_name = CharField(label='Last Name', required=False)
  group_name = ChoiceField(label='Role', choices=get_group_choices_with_blank(), required=False)
  gender = ChoiceField(label='Gender', choices=get_gender_choices_with_blank(), required=False)

  fields = ['first_name', 'last_name', 'gender', 'group_name']

  def __init__(self, initial, *args, **kwargs):
    super().__init__(*args, **kwargs)

    for field in self.fields:
      if field in ['group_name', 'gender']:
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})

      if initial and field in initial:
        self.fields[field].initial = initial[field]