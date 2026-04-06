export interface LeadData {
  name: string
  phone: string
  service?: string
  zip?: string
  message?: string
}

/**
 * Escape user-supplied strings before interpolating into HTML.
 * Prevents XSS in email clients that render HTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Builds a branded HTML email string for a new lead notification.
 * Uses inline styles — email clients do not support external CSS.
 */
export function buildLeadEmail(data: LeadData): string {
  const name = escapeHtml(data.name)
  const phone = escapeHtml(data.phone)
  const service = data.service ? escapeHtml(data.service) : 'Not specified'
  const zip = data.zip ? escapeHtml(data.zip) : '—'
  const message = data.message ? escapeHtml(data.message) : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — Heartland Plumbing Co.</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f7f6; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7f6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color: #1a7a6e; padding: 28px 32px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold; line-height: 1.3;">
                New Lead — Heartland Plumbing Co.
              </h1>
              <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">
                A visitor submitted the contact form on your website.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">

                <!-- Name -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; color: #6e847b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; vertical-align: top;">
                    Name
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; color: #1a1f1e; font-size: 15px; font-weight: bold; vertical-align: top;">
                    ${name}
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; color: #6e847b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; vertical-align: top;">
                    Phone
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; vertical-align: top;">
                    <a href="tel:${phone}" style="color: #1a7a6e; font-size: 15px; font-weight: bold; text-decoration: none;">
                      ${phone}
                    </a>
                  </td>
                </tr>

                <!-- Service -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; color: #6e847b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; vertical-align: top;">
                    Service
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #dce5e1; color: #1a1f1e; font-size: 15px; vertical-align: top;">
                    ${service}
                  </td>
                </tr>

                <!-- Zip -->
                <tr>
                  <td style="padding: 10px 0; ${message ? 'border-bottom: 1px solid #dce5e1;' : ''} color: #6e847b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; vertical-align: top;">
                    Zip Code
                  </td>
                  <td style="padding: 10px 0; ${message ? 'border-bottom: 1px solid #dce5e1;' : ''} color: #1a1f1e; font-size: 15px; vertical-align: top;">
                    ${zip}
                  </td>
                </tr>

              </table>

              ${
                message
                  ? `<!-- Message -->
              <div style="margin-top: 20px;">
                <p style="margin: 0 0 8px; color: #6e847b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
                  Message
                </p>
                <div style="background-color: #f5f7f6; border-left: 3px solid #1a7a6e; border-radius: 4px; padding: 14px 16px;">
                  <p style="margin: 0; color: #1a1f1e; font-size: 14px; line-height: 1.6;">
                    ${message}
                  </p>
                </div>
              </div>`
                  : ''
              }

              <!-- Call to action -->
              <div style="margin-top: 28px; padding: 18px; background-color: #f5f7f6; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 12px; color: #3d5a52; font-size: 14px; font-weight: bold;">
                  Ready to call back?
                </p>
                <a href="tel:${phone}" style="display: inline-block; background-color: #1a7a6e; color: #ffffff; font-size: 15px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 4px;">
                  Call ${phone}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f7f6; border-top: 1px solid #dce5e1; padding: 18px 32px; text-align: center;">
              <p style="margin: 0; color: #9eb3ab; font-size: 12px;">
                This notification was sent by your website at heartlandplumbingomaha.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
