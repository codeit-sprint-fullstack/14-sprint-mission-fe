async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error('Image file is required');
      error.code = 400;
      throw error;
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return res.status(200).json({
      url: `${baseUrl}/uploads/${req.file.filename}`,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  uploadImage,
}