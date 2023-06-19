import { notification } from "antd";

export const openNotification = (type, title, description = null) => {
	notification[type]({
		message: title,
		description: description,
		duration: 5,
		placement: "bottomRight",
	});
};
