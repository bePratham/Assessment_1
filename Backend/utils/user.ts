interface User {
  id: string;
  username: string;
  room: string;
  host: boolean;
  presenter: boolean;
}

const users: User[] = [];

// Join user to chat
const userJoin = (id: string, username: string, room: string, host: boolean, presenter: boolean): User => {
  const user: User = { id, username, room, host, presenter };

  users.push(user);
  return user;
};

// User leaves chat
const userLeave = (id: string): User | undefined => {
  const index: number = users.findIndex((user: User) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return undefined;
};

// Get users
const getUsers = (room: string): User[] => {
  const roomUsers: User[] = users.filter((user: User) => user.room === room);
  return roomUsers;
};

export { userJoin, userLeave, getUsers, User };
