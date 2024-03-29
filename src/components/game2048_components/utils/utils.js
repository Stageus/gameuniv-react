import { REGEX_MAP } from "../constants/regex";

export const isMobile = (value) => {
    return (
        REGEX_MAP.mobileDevice.test(value) ||
        REGEX_MAP.mobileDeviceExtend.test(value.substring(0, 4))
    );
};
