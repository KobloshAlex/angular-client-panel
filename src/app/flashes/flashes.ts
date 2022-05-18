const ERROR = Object.freeze({
  cssClass: "alert-danger",
  timeout: 4000,
});

const SUCCESS = Object.freeze({
  cssClass: "alert-success",
  timeout: 4000,
});

const WARNING = Object.freeze({
  cssClass: "alert-warning",
  timeout: 4000,
});

export const LEVEL = Object.freeze({
  ERROR: ERROR,
  SUCCESS: SUCCESS,
  WARNING: WARNING,
});

export const FLASH_MESSAGE = Object.freeze({
  USER_VALIDATION_REJECT: "Please fill out the form correctly",
  USER_CREATED: "New Client added",
});