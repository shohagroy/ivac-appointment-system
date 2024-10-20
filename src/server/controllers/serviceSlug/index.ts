import prisma from "@/server/prisma";
import { Prisma, ServiceSlug } from "@prisma/client";

const create = async (data: ServiceSlug) => {
  try {
    const response = await prisma.serviceSlug.create({
      data: {
        center: data.center,
        ivac: data.ivac,
        phone: data.phone || null,
        asignUserId: data.asignUserId || null,
        otp: data.otp || null,
        dateSlot: data.dateSlot || null,
        timeSlot: data.timeSlot || Prisma.JsonNull,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (data: ServiceSlug) => {
  const id = data?.id;
  const response = await prisma?.serviceSlug.update({
    where: { id },
    data: {
      center: data?.center,
      ivac: data?.ivac,
      phone: data?.phone,
      asignUserId: data?.asignUserId,
      otp: data?.otp,
      dateSlot: data?.dateSlot,
      timeSlot: data?.timeSlot ?? Prisma.JsonNull,
    },
  });
  return response;
};

const deleteOne = async (data: ServiceSlug) => {
  const id = data?.id;

  const response = await prisma.serviceSlug.delete({ where: { id } });
  return response;
};

const getAll = async () => {
  const response = await prisma.serviceSlug.findMany({
    include: {
      asignUser: true,
      visaFiles: true,
    },
  });
  return response;
};

const serviceSlugControllers = {
  create,
  update,
  getAll,
  deleteOne,
};

export default serviceSlugControllers;
