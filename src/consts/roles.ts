export enum ROLES  {
    CUSTOMER = "customer",
    STAFF = "staff",
    MANAGER = "manager",
    REFEREE = "referee"
  };

  export const rolesArr = [ROLES.REFEREE, ROLES.CUSTOMER, ROLES.MANAGER, ROLES.STAFF];

export const privateRole = [ROLES.REFEREE, ROLES.MANAGER, ROLES.STAFF];