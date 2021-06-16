const cloudinary = require('cloudinary');
require('dotenv').config();

/** ******
 * @class Upload
 *
 * @description Picture Upload
 *
 ********** */

class Upload {
  /**
   *  @static
   *
   * @param {object} request - {file named image}
   *
   * @returns {object} - status, data, size
   *
   *
   * @description This method is used to upload a picture to cloudinary
   * @memberOf Upload
   * */

  static async upLoad(file, res) {

    try {
      return cloudinary.v2.uploader
        .upload(file.tempFilePath, { resourse_type: 'auto' })
        .then(async (result) => {
          if (!result) return res.status(400).json({ message: 'upload error' });
          // image response
          return result;
        })
        .catch((err) =>{
          return res.status(500).json({
          message: `Network Error`
        })})
      } catch (err) {
      return res.status(500).json({
        message: ' Error from server',
      });
    }
  }
}

module.exports = Upload;