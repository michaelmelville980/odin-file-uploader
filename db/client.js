const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser({ username, passwordHash }) {
  return prisma.user.create({ data: { username, passwordHash } });
}aa
/
async function findUserByUsername(username) {
  return prisma.user.findUnique({ where: { username } });
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function returnSelectedChildrenOrRoot() {
  const selected = await prisma.item.findFirst({ where: { isSelected: true } });

  if (selected && selected.children.length > 0) {
    return selected.children;
  }

  const rootItems = await prisma.item.findMany({ where: { parentId: null } });

  return rootItems.length > 0 ? rootItems : null;
}

async function addFolder(folderName) {
  return await prisma.item.create({
    data: {
      name: folderName,
      type: "FOLDER",
    },
  });
}

module.exports = {
  prisma,
  createUser,
  findUserByUsername,
  findUserById,
  returnSelectedChildrenOrRoot,
  addFolder,
};
