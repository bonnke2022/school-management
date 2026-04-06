const createTokenUser = (attendant) => {
  return { name: attendant.name, attendantId: attendant._id };
};

module.exports = createTokenUser;
