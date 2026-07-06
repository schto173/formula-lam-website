import slugify from 'slugify';
import { prisma } from './prisma';

export async function uniqueSlug(title: string, existingId?: string): Promise<string> {
  const base = slugify(title, { lower: true, strict: true }) || 'post';
  let slug = base;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.newsPost.findUnique({ where: { slug } });
    if (!existing || existing.id === existingId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}
