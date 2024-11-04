from .models import SystemCode

GENDER_DOMAIN = 'GENDER'
STATE_DOMAIN = 'STATE'
TOKEN_DOMAIN = 'TOKEN'

class CodeSet():
  def __init__(self, domain):
    self.domain = domain
    self.code_set = SystemCode.objects.filter(domain=domain).order_by('integer_value', 'description')

  def as_choices(self):
    return [(code.code, code.description) for code in self.code_set]

class CodeRecord():
  def __init__(self, domain, code):
    self.domain = domain
    self.code = code
    self.code_record = SystemCode.objects.get(domain=domain, code=code)

  def get_descripton(self):
    return self.code_record.description
  
  def get_integer_value(self):
    return self.code_record.integer_value
  
  def get_alt_description(self):
    return self.code_record.alt_description

def get_gender_choices():
  return CodeSet(GENDER_DOMAIN).as_choices()

def get_gender_description(code):
  return CodeRecord(GENDER_DOMAIN, code).get_descripton()

def get_state_choices():
  return CodeSet(STATE_DOMAIN).as_choices()

def get_state_description(code):
  return CodeRecord(STATE_DOMAIN, code).get_descripton()

def get_token_choices():
  return CodeSet(TOKEN_DOMAIN).as_choices()

def get_token_description(code):
  return CodeRecord(TOKEN_DOMAIN, code).get_descripton()

def get_token_expiry():
  return CodeRecord(TOKEN_DOMAIN, 'EXPIRY').get_integer_value()