const userViewModel = (user) => {
  return {
    name: user.name,
    id: user._id,
    eventsByUserLink: `/events?userID=${user._id}`
  };
};

export default userViewModel;
