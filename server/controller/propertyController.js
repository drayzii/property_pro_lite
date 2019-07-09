import { v2 as cloudinary } from 'cloudinary';

import Property from '../model/propertyModel';


cloudinary.config({
  cloud_name: 'drayzii',
  api_key: '684962114961327',
  api_secret: 'nd7rO_KTFnhyfkRXCS4pqzgIyjA',
});


class property {
  static addProperty(req, res) {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        status: 'failed',
        error: 'Log In First',
      });
    } else {
      const file = req.files.photo;
      cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
        if (error) {
          res.json({
            status: 'failed',
            error: 'Could not upload image',
          });
        } else {
          const id = Property.length + 1;
          const {
            type, state, city, address, price,
          } = req.body;
          const newProperty = {
            id,
            status: 'Available',
            type,
            state,
            city,
            address,
            price,
            created_on: Date.now,
            image_url: result.url,
          };
          Property[id - 1] = newProperty;
          res.json({
            status: 'success',
            data: newProperty,
          });
        }
      });
    }
  }
}

export default property;
