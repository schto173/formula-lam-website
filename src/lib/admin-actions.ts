'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { createSession, destroySession } from './session';
import { requireAdmin } from './auth-guard';
import { saveUploadedImage } from './uploads';
import { uniqueSlug } from './slug';

// ---- Auth ----

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '');

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    redirect('/admin/login?error=1');
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    redirect('/admin/login?error=1');
  }

  await createSession(admin.username);
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  await destroySession();
  redirect('/admin/login');
}

// ---- Members ----

export async function createMember(formData: FormData) {
  await requireAdmin();
  const photo = formData.get('photo') as File | null;
  let photoUrl: string | undefined;
  if (photo && photo.size > 0) {
    photoUrl = await saveUploadedImage(photo);
  }

  await prisma.member.create({
    data: {
      name: String(formData.get('name') || ''),
      role: String(formData.get('role') || ''),
      bio: String(formData.get('bio') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
      active: formData.get('active') === 'on',
      photoUrl,
    },
  });
  revalidatePath('/admin/members');
  revalidatePath('/team');
}

export async function updateMember(id: string, formData: FormData) {
  await requireAdmin();
  const photo = formData.get('photo') as File | null;
  let photoUrl: string | undefined;
  if (photo && photo.size > 0) {
    photoUrl = await saveUploadedImage(photo);
  }

  await prisma.member.update({
    where: { id },
    data: {
      name: String(formData.get('name') || ''),
      role: String(formData.get('role') || ''),
      bio: String(formData.get('bio') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
      active: formData.get('active') === 'on',
      ...(photoUrl ? { photoUrl } : {}),
    },
  });
  revalidatePath('/admin/members');
  revalidatePath('/team');
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await prisma.member.delete({ where: { id } });
  revalidatePath('/admin/members');
  revalidatePath('/team');
}

// ---- News ----

export async function createNewsPost(formData: FormData) {
  await requireAdmin();
  const cover = formData.get('coverImage') as File | null;
  let coverImageUrl: string | undefined;
  if (cover && cover.size > 0) {
    coverImageUrl = await saveUploadedImage(cover);
  }

  const title = String(formData.get('title') || '');
  const published = formData.get('published') === 'on';
  const slug = await uniqueSlug(title);

  await prisma.newsPost.create({
    data: {
      title,
      slug,
      excerpt: String(formData.get('excerpt') || ''),
      body: String(formData.get('body') || ''),
      published,
      publishedAt: published ? new Date() : null,
      coverImageUrl,
    },
  });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
}

export async function updateNewsPost(id: string, formData: FormData) {
  await requireAdmin();
  const cover = formData.get('coverImage') as File | null;
  let coverImageUrl: string | undefined;
  if (cover && cover.size > 0) {
    coverImageUrl = await saveUploadedImage(cover);
  }

  const existing = await prisma.newsPost.findUniqueOrThrow({ where: { id } });
  const title = String(formData.get('title') || '');
  const published = formData.get('published') === 'on';
  const slug = title !== existing.title ? await uniqueSlug(title, id) : existing.slug;

  await prisma.newsPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: String(formData.get('excerpt') || ''),
      body: String(formData.get('body') || ''),
      published,
      publishedAt: published ? existing.publishedAt ?? new Date() : null,
      ...(coverImageUrl ? { coverImageUrl } : {}),
    },
  });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
}

export async function deleteNewsPost(id: string) {
  await requireAdmin();
  await prisma.newsPost.delete({ where: { id } });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
}

// ---- Positions ----

export async function createPosition(formData: FormData) {
  await requireAdmin();
  await prisma.position.create({
    data: {
      title: String(formData.get('title') || ''),
      teamSize: String(formData.get('teamSize') || '1 student'),
      department: String(formData.get('department') || ''),
      description: String(formData.get('description') || ''),
      active: formData.get('active') === 'on',
    },
  });
  revalidatePath('/admin/positions');
  revalidatePath('/join');
}

export async function updatePosition(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.position.update({
    where: { id },
    data: {
      title: String(formData.get('title') || ''),
      teamSize: String(formData.get('teamSize') || '1 student'),
      department: String(formData.get('department') || ''),
      description: String(formData.get('description') || ''),
      active: formData.get('active') === 'on',
    },
  });
  revalidatePath('/admin/positions');
  revalidatePath('/join');
}

export async function deletePosition(id: string) {
  await requireAdmin();
  await prisma.position.delete({ where: { id } });
  revalidatePath('/admin/positions');
  revalidatePath('/join');
}

// ---- Applications ----

export async function updateApplicationStatus(id: string, formData: FormData) {
  await requireAdmin();
  const status = String(formData.get('status') || 'new');
  await prisma.application.update({ where: { id }, data: { status } });
  revalidatePath('/admin/applications');
}

export async function deleteApplication(id: string) {
  await requireAdmin();
  await prisma.application.delete({ where: { id } });
  revalidatePath('/admin/applications');
}

// ---- Sponsors ----

export async function createSponsor(formData: FormData) {
  await requireAdmin();
  const logo = formData.get('logo') as File | null;
  let logoUrl: string | undefined;
  if (logo && logo.size > 0) {
    logoUrl = await saveUploadedImage(logo);
  }

  await prisma.sponsor.create({
    data: {
      name: String(formData.get('name') || ''),
      websiteUrl: String(formData.get('websiteUrl') || ''),
      tier: String(formData.get('tier') || 'supporter'),
      sortOrder: Number(formData.get('sortOrder') || 0),
      active: formData.get('active') === 'on',
      logoUrl,
    },
  });
  revalidatePath('/admin/sponsors');
  revalidatePath('/sponsors');
}

export async function updateSponsor(id: string, formData: FormData) {
  await requireAdmin();
  const logo = formData.get('logo') as File | null;
  let logoUrl: string | undefined;
  if (logo && logo.size > 0) {
    logoUrl = await saveUploadedImage(logo);
  }

  await prisma.sponsor.update({
    where: { id },
    data: {
      name: String(formData.get('name') || ''),
      websiteUrl: String(formData.get('websiteUrl') || ''),
      tier: String(formData.get('tier') || 'supporter'),
      sortOrder: Number(formData.get('sortOrder') || 0),
      active: formData.get('active') === 'on',
      ...(logoUrl ? { logoUrl } : {}),
    },
  });
  revalidatePath('/admin/sponsors');
  revalidatePath('/sponsors');
}

export async function deleteSponsor(id: string) {
  await requireAdmin();
  await prisma.sponsor.delete({ where: { id } });
  revalidatePath('/admin/sponsors');
  revalidatePath('/sponsors');
}

// ---- Vehicle ----

export async function updateVehicle(formData: FormData) {
  await requireAdmin();
  const hero = formData.get('heroImage') as File | null;
  let heroImageUrl: string | undefined;
  if (hero && hero.size > 0) {
    heroImageUrl = await saveUploadedImage(hero);
  }

  await prisma.vehicle.upsert({
    where: { id: 1 },
    update: {
      name: String(formData.get('name') || ''),
      category: String(formData.get('category') || ''),
      tagline: String(formData.get('tagline') || ''),
      description: String(formData.get('description') || ''),
      specs: String(formData.get('specs') || ''),
      ...(heroImageUrl ? { heroImageUrl } : {}),
    },
    create: {
      id: 1,
      name: String(formData.get('name') || ''),
      category: String(formData.get('category') || ''),
      tagline: String(formData.get('tagline') || ''),
      description: String(formData.get('description') || ''),
      specs: String(formData.get('specs') || ''),
      heroImageUrl,
    },
  });
  revalidatePath('/admin/vehicle');
  revalidatePath('/car');
}

export async function addVehiclePhoto(formData: FormData) {
  await requireAdmin();
  const photo = formData.get('photo') as File | null;
  if (!photo || photo.size === 0) {
    throw new Error('Photo file is required.');
  }
  const url = await saveUploadedImage(photo);

  await prisma.vehiclePhoto.create({
    data: {
      url,
      caption: String(formData.get('caption') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePath('/admin/vehicle');
  revalidatePath('/car');
}

export async function deleteVehiclePhoto(id: string) {
  await requireAdmin();
  await prisma.vehiclePhoto.delete({ where: { id } });
  revalidatePath('/admin/vehicle');
  revalidatePath('/car');
}

// ---- Settings ----

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const hero = formData.get('heroImage') as File | null;
  let heroImageUrl: string | undefined;
  if (hero && hero.size > 0) {
    heroImageUrl = await saveUploadedImage(hero);
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      teamName: String(formData.get('teamName') || ''),
      tagline: String(formData.get('tagline') || ''),
      aboutText: String(formData.get('aboutText') || ''),
      contactEmail: String(formData.get('contactEmail') || ''),
      ...(heroImageUrl ? { heroImageUrl } : {}),
    },
    create: {
      id: 1,
      teamName: String(formData.get('teamName') || ''),
      tagline: String(formData.get('tagline') || ''),
      aboutText: String(formData.get('aboutText') || ''),
      contactEmail: String(formData.get('contactEmail') || ''),
      heroImageUrl,
    },
  });
  revalidatePath('/admin/settings');
  revalidatePath('/');
}
