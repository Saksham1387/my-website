import * as React from 'react';

interface EmailTemplateProps {
  subject: string;
  message: string;
  name: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  subject,
  email,
  message
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333' }}>
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
    <hr />
    <p>This message was sent from your portfolio contact form.</p>
  </div>
);
