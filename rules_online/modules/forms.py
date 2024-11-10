from django.forms import Form, HiddenInput, CharField


class WordListForm(Form):
  word01 = CharField(widget=HiddenInput(attrs={'id': 'word01_master'}), required = False, initial="annually")
  word02 = CharField(widget=HiddenInput(attrs={'id': 'word02_master'}), required = False, initial="luggage")
  word03 = CharField(widget=HiddenInput(attrs={'id': 'word03_master'}), required = False, initial="overseas")
  word04 = CharField(widget=HiddenInput(attrs={'id': 'word04_master'}), required = False, initial="delight")
  word05 = CharField(widget=HiddenInput(attrs={'id': 'word05_master'}), required = False, initial="carnival")
  word06 = CharField(widget=HiddenInput(attrs={'id': 'word06_master'}), required = False, initial="bikini")
  word07 = CharField(widget=HiddenInput(attrs={'id': 'word07_master'}), required = False, initial="freckle")
  word08 = CharField(widget=HiddenInput(attrs={'id': 'word08_master'}), required = False, initial="swimsuit")
  word09 = CharField(widget=HiddenInput(attrs={'id': 'word09_master'}), required = False, initial="secluded")
  word10 = CharField(widget=HiddenInput(attrs={'id': 'word10_master'}), required = False, initial="refreshment")
  word11 = CharField(widget=HiddenInput(attrs={'id': 'word11_master'}), required = False, initial="relaxing")
  word12 = CharField(widget=HiddenInput(attrs={'id': 'word12_master'}), required = False, initial="sunscreen")
  word13 = CharField(widget=HiddenInput(attrs={'id': 'word13_master'}), required = False, initial="luxury")
  word14 = CharField(widget=HiddenInput(attrs={'id': 'word14_master'}), required = False, initial="destination")
  word15 = CharField(widget=HiddenInput(attrs={'id': 'word15_master'}), required = False, initial="paradise")
  word16 = CharField(widget=HiddenInput(attrs={'id': 'word16_master'}), required = False, initial="airport")
  word17 = CharField(widget=HiddenInput(attrs={'id': 'word17_master'}), required = False, initial="oyster")
  word18 = CharField(widget=HiddenInput(attrs={'id': 'word18_master'}), required = False, initial="lobster")
  word19 = CharField(widget=HiddenInput(attrs={'id': 'word19_master'}), required = False, initial="casual")
  word20 = CharField(widget=HiddenInput(attrs={'id': 'word20_master'}), required = False, initial="lifeguard")

  fields = ['word01', 'word02', 'word03', 'word04', 'word05', 'word06', 'word07', 'word08', 'word09', 'word10', 
            'word11', 'word12', 'word13', 'word14', 'word15', 'word16', 'word17', 'word18', 'word19', 'word20']
