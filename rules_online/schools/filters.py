from django.forms import TextInput, ChoiceField
from django_filters import FilterSet, CharFilter, ChoiceFilter
from core.models import get_state_choices
from schools.utilities import distinct_school_lgas, distinct_school_types
from schools.models import School

class SchoolFilter(FilterSet):
  school_name = CharFilter(lookup_expr='icontains', widget=TextInput(attrs={"class": "form-control"}))
  address_town = CharFilter(lookup_expr='icontains', widget=TextInput(attrs={"class": "form-control"}))
  school_type = ChoiceFilter(choices=distinct_school_types())
  lga_name = ChoiceFilter(choices=distinct_school_lgas())
  address_state = ChoiceFilter(choices=get_state_choices())

  class Meta:
    model = School
    fields = ['school_name', 'school_type', 'address_town', 'lga_name', 'address_state']
    
    # for field in fields:
    #   if field in ['school_type', 'lga_name', 'address_state']:
    #     fields[field].widget.attrs.update({'class': 'form-select'})
    #   else:
    #     fields[field].widget.attrs.update({'class': 'form-control'})
