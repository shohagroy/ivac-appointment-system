import prisma from "@/server/prisma";
import { VisaFile, Client } from "@prisma/client";

const create = async (data: VisaFile) => {
  // const response = await prisma.client.create();
  // return response;
};

const update = async (data: VisaFile) => {
  console.log(data);
  // const id = data?.id;
  // const response = await prisma?.client.update({ where: { id }, data });
  // return response;
};

const deleteOne = async (data: VisaFile) => {
  const id = data?.id;
  console.log(data);

  // const response = await prisma.client.delete({ where: { id } });
  // return response;
};

const getAll = async () => {
  // const response = await prisma.client.findMany({});
  // return response;
};

const applicationControllers = {
  create,
  update,
  getAll,
  deleteOne,
};

export default applicationControllers;
