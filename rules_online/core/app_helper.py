from django.template.loader import render_to_string

class BootstrapTabs:
  def __init__(self, tabs):
      self.tabs = tabs
      self.tab_header = ''
      self.tab_body = ''
      self.has_tabs = False

      first_tab = True
      is_active_header_text = ' active'
      is_active_body_text = ' show active'

      for key, value in tabs.items():
        self.has_tabs = True
        tab_name = key
        tab_label = value['label']
        tab_render = value['render']
        tab_dataset = value['dataset']
        tab_source = value['source']      

        tab_content = render_to_string(tab_render, {'collection': tab_dataset, 'source': tab_source})
        self.tab_header += f'<li class="nav-item" role="presentation"><button class="nav-link{is_active_header_text}" id="{tab_name}-tab" data-bs-toggle="tab" data-bs-target="#{tab_name}" type="button" role="tab" aria-controls="{tab_name}" aria-selected="false">{tab_label}</button></li>'
        self.tab_body += f'<div class="tab-pane fade{is_active_body_text}" id="{tab_name}" role="tabpanel" aria-labelledby="{tab_name}-tab">{tab_content}</div>'

        if first_tab:
          is_active_header_text = ''
          is_active_body_text = ''
          first_tab = False

  def render_tab_headers(self):
    return self.tab_header

  def render_tab_contents(self):
    return self.tab_body
