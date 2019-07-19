class responses {
  static success(res, code, data) {
    res.status(code).json({
      status: code,
      data,
    });
  }
  static error(res, code, error) {
    res.status(code).json({
      status: code,
      error,
    });
  }
}

export default responses;
