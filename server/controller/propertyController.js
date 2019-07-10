import { v2 as cloudinary } from 'cloudinary';
import jsonwebtoken from 'jsonwebtoken';

import jwtKey from '../config/keys';
import Property from '../model/propertyModel';


cloudinary.config({
  cloud_name: 'drayzii',
  api_key: '684962114961327',
  api_secret: 'nd7rO_KTFnhyfkRXCS4pqzgIyjA',
});


class property {
  static addProperty(req, res) {
    jsonwebtoken.verify(req.token, jwtKey, (err) => {
      if (err) {
        res.status(403).json({
          status: 'failed',
          error: 'Forbidden route',
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
    });
  }
  static deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10) - 1;
    if (typeof Property[id] === 'undefined' || Property[id] === null) {
      res.json({
        status: 400,
        error: 'Property not Found',
      });
    } else {
      delete Property[id];
      res.json({
        status: 200,
        data: {
          message: 'Property deleted successfully',
        },
      });
    }
  }
  static viewSpecificProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const oneProperty = Property.find(theProperty => theProperty.id === id);
    if (!oneProperty) {
      res.json({
        status: 400,
        error: 'Property not Found',
      });
    } else {
      res.json({
        status: 200,
        data: oneProperty,
      });
    }
  }
}

export default property;
