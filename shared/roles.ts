export enum Role {
  Admin = "admin",
  Trainer = "trainer",
  Member = "member",
}

export function isValidRole(value: any): value is Role {
  return Object.values(Role).includes(value);
}
