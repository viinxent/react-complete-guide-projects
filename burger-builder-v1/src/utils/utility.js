export const updateObject = (oldObject, newObject) => {
  return {
    ...oldObject,
    ...newObject
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return isValid;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = re.test(String(value).toLowerCase());
  }

  return isValid;
};
