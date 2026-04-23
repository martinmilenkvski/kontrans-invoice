import { NextResponse } from 'next/server';

// Resend is disabled as requested
// import { Resend } from 'resend';
// const resendApiKey = process.env.RESEND_API_KEY;
// const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transportMode, origin, destination, weight, volume, commodity, email, phone } = body;

    // Server-side validation (keep this to ensure data integrity)
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

    // Log the request to console instead of sending email
    console.log('--- NEW CONTACT REQUEST (Email Disabled) ---');
    console.log('Transport:', transportMode);
    console.log('From:', origin, 'To:', destination);
    console.log('Contact:', email, phone);
    console.log('Details:', { weight, volume, commodity });
    console.log('-------------------------------------------');

    // Return mock success
    return NextResponse.json({ 
      success: true, 
      message: 'Барањето е успешно примено (Email sending is currently disabled).' 
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Contact API] Unexpected error:', errorMessage);
    return NextResponse.json(
      { success: false, errors: ['Серверска грешка: ' + errorMessage] },
      { status: 500 }
    );
  }
}


