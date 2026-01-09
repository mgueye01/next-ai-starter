import React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  subject?: string;
  message: string;
}

export function ContactEmail({ name, email, phone, projectType, subject, message }: ContactEmailProps) {
  const projectTypeLabels: Record<string, string> = {
    portrait: 'Portrait',
    mariage: 'Mariage',
    evenement: 'Événement',
    fashion: 'Fashion',
    corporate: 'Corporate',
    autre: 'Autre',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #BBDCE5 0%, #CFAB8D 100%)',
        padding: '30px',
        textAlign: 'center' as const
      }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: 300 }}>
          Nouvelle Demande de Contact
        </h1>
      </div>

      <div style={{ padding: '30px', backgroundColor: '#FAFAFA' }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ color: '#6B5B47', fontSize: '18px', marginTop: 0 }}>
            Informations du contact
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#8B7355', width: '140px' }}>
                  Nom
                </td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#6B5B47', fontWeight: 500 }}>
                  {name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#8B7355' }}>
                  Email
                </td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF' }}>
                  <a href={`mailto:${email}`} style={{ color: '#CFAB8D', textDecoration: 'none' }}>
                    {email}
                  </a>
                </td>
              </tr>
              {phone && (
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#8B7355' }}>
                    Téléphone
                  </td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF' }}>
                    <a href={`tel:${phone}`} style={{ color: '#CFAB8D', textDecoration: 'none' }}>
                      {phone}
                    </a>
                  </td>
                </tr>
              )}
              <tr>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#8B7355' }}>
                  Type de projet
                </td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#6B5B47' }}>
                  <span style={{
                    backgroundColor: '#BBDCE5',
                    color: '#6B5B47',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}>
                    {projectTypeLabels[projectType] || projectType}
                  </span>
                </td>
              </tr>
              {subject && (
                <tr>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#8B7355' }}>
                    Sujet
                  </td>
                  <td style={{ padding: '12px 0', borderBottom: '1px solid #ECEEDF', color: '#6B5B47' }}>
                    {subject}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: '#6B5B47', fontSize: '16px', marginBottom: '12px' }}>
              Message
            </h3>
            <div style={{
              backgroundColor: '#ECEEDF',
              borderRadius: '8px',
              padding: '16px',
              color: '#6B5B47',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap' as const
            }}>
              {message}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          textAlign: 'center' as const,
          color: '#8B7355',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            Ce message a été envoyé depuis le formulaire de contact du site elGato Photo.
          </p>
          <p style={{ margin: 0 }}>
            Répondre directement à cet email pour contacter {name}.
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#6B5B47',
        padding: '20px',
        textAlign: 'center' as const
      }}>
        <p style={{ color: '#D9C4B0', margin: 0, fontSize: '14px' }}>
          elGato Photo Paris - Photographe Professionnel
        </p>
      </div>
    </div>
  );
}
