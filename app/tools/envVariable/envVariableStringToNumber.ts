const envVariableStringToNumber = (envVariable: string | undefined) => {
  try {
    if (envVariable) {
      const envVariableToNumber: number = parseInt(envVariable);
      return envVariableToNumber;
    } else {
      throw new Error(
        "The environment variable is either empty or does not exist",
      );
    }
  } catch (e) {
    console.error(e);
  }
};

export default envVariableStringToNumber;
