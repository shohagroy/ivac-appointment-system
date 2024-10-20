import prisma from "@/server/prisma";
import { VisaFile } from "@prisma/client";

const create = async (data: VisaFile) => {
  const response = await prisma.visaFile.create({
    data: {
      clientId: data?.clientId,
      status: false,
      appointmentFile: JSON.stringify(data?.appointmentFile),
    },
  });
  return response;
};

const update = async (data: VisaFile) => {
  const id = data?.id;
  const response = await prisma?.visaFile.update({
    where: { id },
    data: {
      appointmentFile: JSON.stringify(data?.appointmentFile),
    },
  });
  return response;
};

const deleteOne = async (data: VisaFile) => {
  const id = data?.id;
  console.log(data?.id, "data");

  const response = await prisma.visaFile.delete({ where: { id } });
  return response;
};

const getAll = async () => {
  const response = await prisma.visaFile.findMany({
    include: {
      client: true,
    },
  });
  return response;
};

const applicationControllers = {
  create,
  update,
  getAll,
  deleteOne,
};

export default applicationControllers;
