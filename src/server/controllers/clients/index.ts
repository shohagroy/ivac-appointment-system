import prisma from "@/server/prisma";
import { Client } from "@prisma/client";

const create = async (data: Client) => {
  console.log(data);
  try {
    const response = await prisma.client.create({ data });

    return response;
  } catch (error) {
    console.log(error);
  }
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
