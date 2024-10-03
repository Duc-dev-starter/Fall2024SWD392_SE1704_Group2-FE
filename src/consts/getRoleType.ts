export const getRoleColor = (role: string) => {
	switch (role) {
		case "customer":
			return "text-blue-800";
		case "manager":
			return "text-green-700";
		case "staff":
			return "text-orange-500";
		case "admin":
			return "text-violet-500";
		default:
			return "";
	}
};


export const getRoleLabel = (role: string) => {
	switch (role) {
		case "customer":
			return "Customer";
		case "manager":
			return "Manager";
		case "staff":
			return "Staff";
		case "admin":
			return "Admin";
		case "all":
			return "All";
		default:
			return "";
	}
};