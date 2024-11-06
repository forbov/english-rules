from datetime import datetime, timedelta
from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from core.models import get_group_description, get_token_expiry
from .models import Invitation

def send_er_email(subject, text_content, html_content, from_email, to_email):
  send_mail(subject=subject, message=text_content, from_email=from_email, recipient_list=[to_email], html_message=html_content)

def send_invitation_email(invitation):

  #  Sends an invitation email to the recipient.
  role = get_group_description(invitation.group_name)
  
  subject = f'Invitation to Join {settings.APP_NAME} as a {role}'
  emails_home = 'invitations/emails/'
  # Render the email template
  context = {
    'invitation': invitation,
    'site_url': settings.SITE_URL,
    'app_name': settings.APP_NAME,
    'accept_url': f'{settings.ACCEPT_URL}?token={invitation.invitation_token}',
    'role': role
  }
  if invitation.school:
    subject = f'{subject} for {invitation.school.school_name}'
    context['school'] = invitation.school

  if invitation.group_name in ['manager', 'teacher']:
    html_template = f'{emails_home}invitation_teacher_email.html'
    text_template = f'{emails_home}invitation_teacher_email.txt'
  else:
    html_template = f'{emails_home}invitation_{invitation.group_name}_email.html'
    text_template = f'{emails_home}invitation_{invitation.group_name}_email.txt'

  html_content = render_to_string(html_template, context)
  text_content = render_to_string(text_template, context)

  send_er_email(subject=subject, text_content=text_content, html_content=html_content, 
                from_email=settings.DEFAULT_FROM_EMAIL, to_email=invitation.email)

def send_pending_invites(user, school):
  pending_invitations = None
  invitation_count = 0
  if school:
    pending_invitations = school.invitations.filter(status='PENDING',
                                                    invited_by=user)
  else:
    pending_invitations = Invitation.filter(status='PENDING',
                                            invited_by=user)

  for invitation in pending_invitations:
    invitation_count += 1
    # Send the invitation email
    send_invitation_email(invitation)
    
    # Mark the invitation as sent
    invitation.status = 'INVITED'
    invitation.invited_at = datetime.now()
    invitation.expires_at = invitation.invited_at + timedelta(days=get_token_expiry())
    invitation.save()

  return invitation_count