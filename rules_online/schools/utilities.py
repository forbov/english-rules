from schools.models import School

def distinct_school_types():
  qs = School.objects.distinct('school_type').order_by('school_type')
  return [(row.school_type, row.school_type) for row in qs]


def distinct_school_lgas():
  qs = School.objects.distinct('lga_name').order_by('lga_name')
  return [(row.lga_name, row.lga_name) for row in qs]

