export const getRoleColor = (role: string) => {
	switch (role) {
		case "member":
			return "text-blue-800";
		case "manager":
			return "text-green-700";
		case "staff":
			return "text-orange-500";
		case "referee":
			return "text-violet-500";
		default:
			return "";
	}
};


export const getRoleLabel = (role: string) => {
	switch (role) {
		case "member":
			return "Member";
		case "manager":
			return "Manager";
		case "staff":
			return "Staff";
		case "referee":
			return "Referee";
		case "all":
			return "All";
		default:
			return "";
	}
};