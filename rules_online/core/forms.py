from .auth_forms import UserCreationForm, AuthenticationForm

class LoginForm(AuthenticationForm):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      self.fields[field].widget.attrs.update({'class': 'form-control'})

class RegisterForm(UserCreationForm):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    for field in self.fields:
      if field == 'gender':
        self.fields[field].widget.attrs.update({'class': 'form-select'})
      else:
        self.fields[field].widget.attrs.update({'class': 'form-control'})
