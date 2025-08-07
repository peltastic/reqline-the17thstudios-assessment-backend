function validate(data, schema) {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  }
  return value;
}

module.exports = {
  validate,
};
