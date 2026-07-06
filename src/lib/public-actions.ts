'use server';

import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function submitApplication(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const positionId = String(formData.get('positionId') || '') || null;

  if (!name || !email || !message) {
    redirect('/join?error=missing');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    redirect('/join?error=email');
  }

  let validPositionId: string | null = null;
  if (positionId) {
    const position = await prisma.position.findUnique({ where: { id: positionId } });
    if (position) validPositionId = position.id;
  }

  await prisma.application.create({
    data: { name, email, phone, message, positionId: validPositionId },
  });

  redirect('/join?submitted=1');
}
