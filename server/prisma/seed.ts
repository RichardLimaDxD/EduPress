import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: [
      { id: 'abe02012-7cd4-47c7-8249-e46467f8d6bc', name: 'Development' },
      { id: '5ba2beb0-0760-4e63-8609-1768a85ff2e5', name: 'Finance' },
      { id: 'cf88362d-7f69-474d-a06a-c7add04e92cc', name: 'Marketing' },
      { id: '027e9431-1371-4129-8634-6a7e11ba5d98', name: 'Art & Design' },
      { id: 'd17d9243-523d-42be-9a99-e4b36ffd00f5', name: 'Videography' },
      { id: '3fce85b6-60e1-4642-a250-4edaa1aa2884', name: 'Photography' },
      { id: 'f7d26d49-d52e-4fa7-b4fe-0e7e97cb5b4e', name: 'Network' },
      { id: '0b31a098-df88-4fda-9502-e99af51cd398', name: 'Science' },
      { id: 'c39ffffe-4809-4277-adce-0093ad74c5c6', name: 'Content writing' },
    ],
  });

  await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@mail.com',
      password: '1234',
      roles: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Juninho',
      email: 'juninho@mail.com',
      password: '1234',
      roles: 'SELLER',
    },
  });

  await prisma.course.createMany({
    data: [
      {
        title: 'Web Development Course',
        description: 'Learn how to build responsive and dynamic websites.',
        price: 199.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'abe02012-7cd4-47c7-8249-e46467f8d6bc',
      },
      {
        title: 'Photography Course',
        description: 'Become a professional in digital photography.',
        price: 149.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: '3fce85b6-60e1-4642-a250-4edaa1aa2884',
      },
      {
        title: 'Advanced JavaScript',
        description: 'Master JavaScript and become a front-end pro.',
        price: 299.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'abe02012-7cd4-47c7-8249-e46467f8d6bc',
      },
      {
        title: 'Financial Planning for Beginners',
        description: 'Learn the basics of managing your personal finances.',
        price: 99.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: '5ba2beb0-0760-4e63-8609-1768a85ff2e5',
      },
      {
        title: 'Marketing 101',
        description: 'Learn the fundamentals of digital marketing.',
        price: 199.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'cf88362d-7f69-474d-a06a-c7add04e92cc',
      },
      {
        title: 'UI/UX Design for Beginners',
        description: 'Learn the basics of UI/UX design.',
        price: 120.0,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: '027e9431-1371-4129-8634-6a7e11ba5d98',
      },
      {
        title: 'Photography Masterclass',
        description: 'Master photography and take stunning photos.',
        price: 199.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: '3fce85b6-60e1-4642-a250-4edaa1aa2884',
      },
      {
        title: 'Network Security Essentials',
        description:
          'Learn the basics of network security and data protection.',
        price: 149.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'f7d26d49-d52e-4fa7-b4fe-0e7e97cb5b4e',
      },
      {
        title: 'Content Writing for the Web',
        description:
          'Learn how to write engaging content for online platforms.',
        price: 89.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'c39ffffe-4809-4277-adce-0093ad74c5c6',
      },
      {
        title: 'Science Fundamentals',
        description: 'An introductory course on basic scientific concepts.',
        price: 79.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: '0b31a098-df88-4fda-9502-e99af51cd398',
      },
      {
        title: 'Videography Basics',
        description: 'Learn the fundamentals of videography and video editing.',
        price: 129.99,
        image:
          'https://res.cloudinary.com/dh3tgxcep/image/upload/v1741202396/sbrraisbwawhwieqa6ep.png',
        video_url:
          'https://res.cloudinary.com/dh3tgxcep/video/upload/v1741202395/b3qvbizowv3wfz0xtetx.mp4',
        userId: user2.id,
        categoryId: 'd17d9243-523d-42be-9a99-e4b36ffd00f5',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
