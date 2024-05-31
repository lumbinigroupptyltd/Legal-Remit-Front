export const phoneRegExp = /^(9\d{9}(,9\d{9})*)?$/;

export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const numberRegExp = /^[0-9,\-]+$/;

export const numberRegExp1 = /^(?:[0-9\-]+|null|NaN)?$/;

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const websiteRegex = /^(?:(?:https?|ftp):\/\/)?[^\s/$?#]+\.[^\s/?#]+(?:\/[^\s/?#]+)*$/;

export const textSpecialRegex = /^[^\d]*$/;

export const onlyTextRegex = /^[A-Za-z\s'-]+$/;

export const onlyTextRegex1 = /^(?:[A-Za-z\s\.'-]+|null|NaN)?$/;

export const onlyNumberRegExp = /^[0-9]+$/;

export const fullnameRegex = /^[A-Za-z.]+(?:\s[A-Za-z.]+)+$/;

export const multiNameRegex = /^[A-Za-z.]+(?:\s+[A-Za-z.]+)*$/;

export const firstName = /^[A-Za-z]+$/;

export const middleName = /^[A-Za-z\s]+$/;

export const onlyNum = /^[0-9]+$/;

export const mobileNum = /^9\d{9}$/;

export const ausMobileNumber = /^(0\d{9}|4\d{8})$/;