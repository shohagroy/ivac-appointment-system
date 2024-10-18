import prisma from "@/server/prisma";
import { Client } from "@prisma/client";

const create = async (data: Client, createdBy: string) => {
  const response = await prisma.client.create({ data });
  return response;
};

const update = async (data: Client) => {
  const id = data?.id;
  const response = await prisma?.client.update({ where: { id }, data });
  return response;
};

const deleteOne = async (data: Client) => {
  const id = data?.id;

  const response = await prisma.client.delete({ where: { id } });
  return response;
};

const getAll = async () => {
  const response = await prisma.client.findMany({});
  return response;
};

const clientsControllers = {
  create,
  update,
  getAll,
  deleteOne,
};

export default clientsControllers;
