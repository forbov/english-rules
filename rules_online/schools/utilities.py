from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_invitation_email(invitation, school, subject):
  """
    Sends an invitation email to the recipient.
    """

  # Render the email template
  context = {
    'invitation': invitation,
    'school': school,
    'site_url': settings.SITE_URL,
    'accept_url': settings.ACCEPT_URL,
  }
  html_content = render_to_string('invitations/invitation_email.html', context)
  text_content = render_to_string('invitations/invitation_email.txt', context)

  # Create the email
  email = EmailMultiAlternatives(
    subject=subject,
    body=text_content,
    from_email=settings.DEFAULT_FROM_EMAIL,
    to=[invitation.email],
  )
  email.attach_alternative(html_content, 'text/html')

  # Send the email
  email.send()
