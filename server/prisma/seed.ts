import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.video.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const categories = [
    { id: randomUUID(), name: 'Development' },
    { id: randomUUID(), name: 'Finance' },
    { id: randomUUID(), name: 'Marketing' },
    { id: randomUUID(), name: 'Art & Design' },
    { id: randomUUID(), name: 'Videography' },
    { id: randomUUID(), name: 'Photography' },
    { id: randomUUID(), name: 'Network' },
    { id: randomUUID(), name: 'Science' },
    { id: randomUUID(), name: 'Content Writing' },
  ];

  await prisma.category.createMany({ data: categories });

  const user = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Juninho',
      email: 'juninho@mail.com',
      password: '1234',
      roles: 'SELLER',
    },
  });

  const courses = [
    {
      id: randomUUID(),
      title: 'Web Development',
      description: 'Learn to build websites from scratch.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 199.99,
      userId: user.id,
      categoryId: categories[0].id,
    },
    {
      id: randomUUID(),
      title: 'Financial Planning',
      description: 'Manage your finances effectively.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 99.99,
      userId: user.id,
      categoryId: categories[1].id,
    },
    {
      id: randomUUID(),
      title: 'Social Media Marketing',
      description: 'Master marketing strategies for social media.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 0,
      userId: user.id,
      categoryId: categories[2].id,
    },
    {
      id: randomUUID(),
      title: 'Graphic Design Basics',
      description: 'Learn the fundamentals of design.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 79.99,
      userId: user.id,
      categoryId: categories[3].id,
    },
    {
      id: randomUUID(),
      title: 'Video Editing for Beginners',
      description: 'Edit videos professionally using Premiere Pro.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 129.99,
      userId: user.id,
      categoryId: categories[4].id,
    },
    {
      id: randomUUID(),
      title: 'Photography Essentials',
      description: 'Take stunning photos with any camera.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 0,
      userId: user.id,
      categoryId: categories[5].id,
    },
    {
      id: randomUUID(),
      title: 'Networking Fundamentals',
      description: 'Understand computer networks and protocols.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 59.99,
      userId: user.id,
      categoryId: categories[6].id,
    },
    {
      id: randomUUID(),
      title: 'Physics for Beginners',
      description: 'Explore the basics of physics in a simple way.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 0,
      userId: user.id,
      categoryId: categories[7].id,
    },
    {
      id: randomUUID(),
      title: 'Content Writing Masterclass',
      description: 'Improve your writing skills for blogs and marketing.',
      image:
        'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
      price: 89.99,
      userId: user.id,
      categoryId: categories[8].id,
    },
  ];

  await prisma.course.createMany({ data: courses });

  const videos = courses.flatMap((course) => [
    {
      id: randomUUID(),
      title: 'Introduction',
      video_url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      courseId: course.id,
    },
    {
      id: randomUUID(),
      title: 'Module 1',
      video_url: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
      courseId: course.id,
    },
    {
      id: randomUUID(),
      title: 'Module 2',
      video_url: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
      courseId: course.id,
    },
  ]);

  await prisma.video.createMany({ data: videos });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
