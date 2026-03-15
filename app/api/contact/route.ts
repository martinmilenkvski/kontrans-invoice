import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = [
  'info@kontrans.com.mk',
  'office@kontrans.com.mk',
  'mmilenkovska@kontrans.com.mk',
  'martinm@kontrans.com.mk',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transportMode, origin, destination, weight, volume, commodity, email, phone, needsInsurance } = body;

    // Server-side validation
    const errors: string[] = [];
    if (!transportMode) errors.push('Тип на транспорт не е избран');
    if (!origin?.trim()) errors.push('Место на утовар е задолжително');
    if (!destination?.trim()) errors.push('Место на истовар е задолжително');
    if (!weight?.trim()) errors.push('Тежина е задолжителна');
    if (!email?.trim()) errors.push('Е-маил адреса е задолжителна');
    if (!phone?.trim()) errors.push('Телефонски број е задолжителен');

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const transportLabels: Record<string, string> = {
      sea: 'Бродски Транспорт (FCL/LCL)',
      air: 'Авионски Транспорт',
      road: 'Камионски Транспорт (FTL/LTL)',
      multimodal: 'Мултимодален Транспорт',
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #D42B2B; color: white; padding: 20px 30px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">📦 Ново барање за понуда</h1>
          <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">KON-TRANS Logistics</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #eee; border-top: none;">
          <h2 style="color: #333; font-size: 16px; margin-top: 0; border-bottom: 2px solid #D42B2B; padding-bottom: 8px;">🚛 Транспорт</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">Тип на транспорт:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${transportLabels[transportMode] || transportMode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Место на утовар:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${origin}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Место на истовар:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${destination}</td>
            </tr>
          </table>

          <h2 style="color: #333; font-size: 16px; margin-top: 24px; border-bottom: 2px solid #D42B2B; padding-bottom: 8px;">📋 Детали за товарот</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">Бруто тежина:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${weight || 'Не е наведено'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Волумен (CBM):</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${volume || 'Не е наведено'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Тип на стока:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${commodity || 'Не е наведено'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Осигурување:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${needsInsurance ? '✅ ДА — потребно е осигурување' : '❌ НЕ'}</td>
            </tr>
          </table>

          <h2 style="color: #333; font-size: 16px; margin-top: 24px; border-bottom: 2px solid #D42B2B; padding-bottom: 8px;">👤 Контакт информации</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">Е-маил:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Телефон:</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
          </table>
        </div>

        <div style="background: #111; color: #aaa; padding: 15px 30px; border-radius: 0 0 12px 12px; font-size: 12px; text-align: center;">
          Автоматски генерирано од KON-TRANS веб-страница
        </div>
      </div>
    `;

    console.log('[Contact API] Sending email to:', RECIPIENTS);

    const { data, error } = await resend.emails.send({
      from: 'KON-TRANS <noreply@kontrans.com.mk>',
      to: RECIPIENTS,
      subject: `Барање за понуда — ${origin} → ${destination}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error('[Contact API] Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, errors: [error.message || 'Resend API грешка'], details: error },
        { status: 500 }
      );
    }

    console.log('[Contact API] Email sent successfully, ID:', data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Contact API] Unexpected error:', errorMessage);
    return NextResponse.json(
      { success: false, errors: ['Серверска грешка: ' + errorMessage] },
      { status: 500 }
    );
  }
}
